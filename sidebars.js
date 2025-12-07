/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a set of docs in the sidebar
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: '📖 Front Matter',
      items: [
        'chapters/ch0-preface',
        'chapters/ch0-prerequisites',
      ],
    },
    {
      type: 'category',
      label: '🤖 Main Chapters',
      items: [
        'chapters/ch1-intro',
        'chapters/ch2-humanoid',
        'chapters/ch3-ros2',
        'chapters/ch4-sim',
        'chapters/ch5-vla',
        'chapters/ch6-capstone',
      ],
    },
    {
      type: 'category',
      label: '📚 Appendices',
      items: [
        'appendices/appendix-a',
        'appendices/appendix-b',
        'appendices/appendix-c',
        'appendices/appendix-d',
      ],
    },
  ],
};

module.exports = sidebars;
