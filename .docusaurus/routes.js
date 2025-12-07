import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'a1b'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '87e'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '0de'),
            routes: [
              {
                path: '/docs/appendices/appendix-a',
                component: ComponentCreator('/docs/appendices/appendix-a', 'b89'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/appendices/appendix-b',
                component: ComponentCreator('/docs/appendices/appendix-b', '7bb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/appendices/appendix-c',
                component: ComponentCreator('/docs/appendices/appendix-c', 'e5b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/appendices/appendix-d',
                component: ComponentCreator('/docs/appendices/appendix-d', '363'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapters/ch0-preface',
                component: ComponentCreator('/docs/chapters/ch0-preface', '4e7'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapters/ch0-prerequisites',
                component: ComponentCreator('/docs/chapters/ch0-prerequisites', 'f70'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapters/ch1-intro',
                component: ComponentCreator('/docs/chapters/ch1-intro', 'cb6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapters/ch2-humanoid',
                component: ComponentCreator('/docs/chapters/ch2-humanoid', 'b37'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapters/ch3-ros2',
                component: ComponentCreator('/docs/chapters/ch3-ros2', '087'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapters/ch4-sim',
                component: ComponentCreator('/docs/chapters/ch4-sim', '5e3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapters/ch5-vla',
                component: ComponentCreator('/docs/chapters/ch5-vla', '95e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/chapters/ch6-capstone',
                component: ComponentCreator('/docs/chapters/ch6-capstone', '233'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
