export default {
  path: '/manage/article',
  title: '文章管理',
  icon: 'puzzle-piece',
  children: [
    { path: '/manage/article/index', title: '文章管理', icon: 'home' },
    { path: '/manage/article/partition', title: '分区管理', icon: 'home' },
    { path: '/manage/article/label', title: '标签管理', icon: 'home' },
    { path: '/manage/article/comment', title: '评论管理', icon: 'home' }
  ]
}
