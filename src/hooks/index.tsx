import React from 'react';

import { LessonsProvider } from './lessons';
import { FavoriteCoursesProvider } from './favorites';

const Providers: React.FC = ({ children }) => (
  <LessonsProvider>
    <FavoriteCoursesProvider>{children}</FavoriteCoursesProvider>
  </LessonsProvider>
);

export default Providers;
