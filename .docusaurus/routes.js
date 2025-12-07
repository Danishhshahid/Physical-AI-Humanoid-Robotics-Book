import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/Physical-AI-Humanoid-Robotics-Book/docs',
    component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs', 'ea7'),
    routes: [
      {
        path: '/Physical-AI-Humanoid-Robotics-Book/docs',
        component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs', '0a7'),
        routes: [
          {
            path: '/Physical-AI-Humanoid-Robotics-Book/docs',
            component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs', 'f40'),
            routes: [
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/appendices/appendix-a',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/appendices/appendix-a', '65b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/appendices/appendix-b',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/appendices/appendix-b', '64c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/appendices/appendix-c',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/appendices/appendix-c', '147'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/appendices/appendix-d',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/appendices/appendix-d', '6a4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch0-preface',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch0-preface', '30b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch0-prerequisites',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch0-prerequisites', 'be0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch1-intro',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch1-intro', 'f7f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch2-humanoid',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch2-humanoid', '4df'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch3-ros2',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch3-ros2', 'd37'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch4-sim',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch4-sim', '1c3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch5-vla',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch5-vla', 'dd0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch6-capstone',
                component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/docs/chapters/ch6-capstone', 'e6c'),
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
    path: '/Physical-AI-Humanoid-Robotics-Book/',
    component: ComponentCreator('/Physical-AI-Humanoid-Robotics-Book/', 'd06'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
