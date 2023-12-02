import { useState } from '#imports';

export const useStatePixels = useState('pixels', () => {
  return {
    '1231232131': null,
  };
});

export const useMetaPixelFunction = useState(
  'metaPixelFunction',
  () => function () {},
);
