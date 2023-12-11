// https://github.com/facebook/facebook-nodejs-business-sdk/blob/3edb78dc855ca348fd0291af930c035c03347049/src/objects/serverside/batch-processor.js

import ServerEvent from './server-event';
import EventRequest from './event-request';
import EventResponse from './event-response';

export default function (batch_size: number, concurrent_requests: number) {
  const processEventRequestsGenerator = (
    event_requests: Array<EventRequest>,
  ): Generator<Array<Promise<EventResponse>>, void, EventRequest> => {
    let start = 0;
    let end = concurrent_requests;
    let requests = event_requests.slice(start, end);
    while (requests.length > 0) {
      yield requests.map((request) => request.execute());
      start = end;
      end += concurrent_requests;
      requests = event_requests.slice(start, end);
    }
    return;
  };

  const processEventRequests = async (event_requests: Array<EventRequest>) => {
    const generator = this.processEventRequestsGenerator(event_requests);
    while (true) {
      const batch = generator.next().value;
      if (!batch || batch.length === 0) {
        generator.return();
        return;
      }
      await Promise.all(batch);
    }
  };

  const processEventsGenerator = (
    event_request_to_clone: EventRequest,
    all_events: Array<ServerEvent>,
  ): Generator<Array<Promise<EventResponse>>, void, EventRequest> => {
    let index = 0;
    while (index < all_events.length) {
      let event_requests = [];
      while (
        index < all_events.length &&
        event_requests.length < concurrent_requests
      ) {
        const event_request = event_request_to_clone.cloneWithoutEvents();
        const events = all_events.slice(index, index + batch_size);
        event_request.setEvents(events);
        event_requests.push(event_request);
        index += batch_size;
      }
      yield event_requests.map((request) => request.execute());
    }
    return;
  };

  const processEvents = async (
    event_request_to_clone: EventRequest,
    all_events: Array<ServerEvent>,
  ) => {
    const generator = this.processEventsGenerator(
      event_request_to_clone,
      all_events,
    );
    while (true) {
      const batch = generator.next().value;
      if (!batch || batch.length === 0) {
        generator.return();
        return;
      }
      await Promise.all(batch);
    }
  };
}
