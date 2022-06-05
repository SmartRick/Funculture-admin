import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/manage/article',
  name: '文章管理',
  meta,
  redirect: { name: 'manage-article-partition' },
  component: layoutHeaderAside,
  children: [
    { path: 'index', name: 'manage-article', component: _import('manage/article/index.vue'), meta: { ...meta, title: '文章管理' } },
    { path: 'partition', name: 'manage-article-partition', component: _import('manage/article/partition.vue'), meta: { ...meta, title: '分区管理' } }
  ]
}
