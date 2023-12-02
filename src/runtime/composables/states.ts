import { useState } from '#imports';

import type { SharedUserData } from '../types';

export const useUserData = useState<SharedUserData>('sharedUserData');
