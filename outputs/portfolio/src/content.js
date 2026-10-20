export const profile = {
  name: '桂紫超',
  englishName: 'GUI ZICHAO',
  email: 'zichao_gui@163.com',
  emails: ['guizichao05@gmail.com', 'zichao_gui@163.com', '1292210914@qq.com'],
  github: 'https://github.com/AC-2-18',
  nickname: '超·AC~',
  roles: ['视觉设计', 'AI 设计', '品牌设计'],
  intro: '在视觉与技术之间，探索自己的创作语言。以光电信息科学与工程为起点，将系统思维、机器视觉与动手实践，带入对图像、交互和品牌表达的探索。',
};

export const projects = [
  {
    id: 'form', number: '01', title: 'FORM / 感知之形',
    subtitle: '以流动的光，探索视觉的边界。',
    category: 'VISUAL EXPLORATION', year: 'CONCEPT',
    image: 'assets/project-form.svg', imageLabel: '网站视觉概念 · 非商业项目',
    tags: ['视觉实验', '动态表达', '个人网站'],
    description: '为本作品集基础版本制作的视觉概念。围绕「创意与技术相遇」的主题，以黑色空间、金属质感与紫色光线，探索一致的网页视觉语言。',
    notes: [
      ['创作语境', '本网站的示例视觉，供后续真实设计作品替换；不代表既往客户案例。'],
      ['视觉系统', '冷白字体与石墨黑空间构成基础，少量电光紫建立视觉焦点。'],
      ['动态表达', '早期视觉实验制作了原创循环影像；当前网站优先采用清晰排版与轻量交互，不再使用开场动画。'],
    ],
  },
  {
    id: 'robot', number: '02', title: '平衡，源于每一次修正',
    subtitle: '双轮足机器人 · 从结构到控制。',
    category: 'ROBOTICS × ENGINEERING', year: '2025 — 2026',
    image: 'assets/project-robot.svg', imageLabel: '工程项目 · 示意图，非实物照片',
    tags: ['STM32H7', 'PID / LQR', 'SolidWorks'],
    description: '作为项目主研，参与双轮足机器人的硬件搭建、算法移植与控制优化。用反复验证把抽象的控制理论变成可运行的原理样机。',
    notes: [
      ['项目周期', '2025.07 — 2026.06 · 项目主研'],
      ['结构与实现', '使用 SolidWorks 设计底盘，结合 3D 打印与机加工迭代两版；将开源两轮自平衡算法移植至 STM32H7，适配电机驱动与 IMU。'],
      ['控制优化', '逐层排查信号干扰并调整 PID、LQR 参数，按简历记录将姿态角波动从 ±5° 降至 ±1° 以内。完成自主平衡、遥控运动及复杂障碍地形测试。'],
      ['视觉说明', '当前封面是为网站制作的工程示意图，并非项目实际结构或实物照片。'],
    ],
  },
  {
    id: 'vision', number: '03', title: '让感知，成为行动',
    subtitle: '智能激光对抗小车 · 识别与响应。',
    category: 'COMPUTER VISION', year: '2025',
    image: 'assets/project-vision.svg', imageLabel: '工程项目 · 概念可视化',
    tags: ['机器视觉', '云台控制', '现场调优'],
    description: '在智能激光对抗小车项目中，围绕目标识别、定位和二维云台控制开展实现与调试，让视觉输入转化为可执行的控制动作。',
    notes: [
      ['项目周期', '2025.07 — 2025.08 · 项目主研'],
      ['视觉与控制', '应用传统图像处理方法完成目标识别与定位，研究舵机、步进与无刷电机的特点和使用场景。'],
      ['现场验证', '针对场地摩擦、灯光变化调整代码与控制参数。简历记录获得全国光电设计大赛东南赛区二等奖（激光小车的智能对抗）。'],
      ['视觉说明', '当前画面为概念可视化，不是实际系统截图或精度测试结果。'],
    ],
  },
];

export const strengths = [
  { icon: '◎', title: '系统视角', en: 'SYSTEMS THINKING', text: '从结构、信号到控制链路，理解各环节如何协同，把复杂问题拆解成可以验证的步骤。', keywords: '结构 / 逻辑 / 全局' },
  { icon: '⌘', title: '跨域实践', en: 'CROSS-DISCIPLINARY', text: '连接嵌入式、机器视觉与三维结构，以工程实践为基础，探索视觉与交互的新表达。', keywords: '视觉 / 技术 / 实验' },
  { icon: '↗', title: '迭代与落地', en: 'BUILD & REFINE', text: '保持「现象 → 排查 → 验证 → 落地」的工作习惯，让每一次复盘都成为下一次改进的起点。', keywords: '原型 / 测试 / 复盘' },
  { icon: '✳', title: '协作与推进', en: 'COLLABORATION', text: '竞赛中的带队经历，让我重视任务分工、进度把控与技术接口沟通，在共同目标下推进项目。', keywords: '沟通 / 协同 / 交付' },
];
