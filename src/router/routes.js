
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
   
  },
  {
    path: '/new',
    component: () => import('src/components/CreateNote.vue'),
   
  },


  // Always leave this as last one,
  // but you can also remove it
  
]

export default routes
