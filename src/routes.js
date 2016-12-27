const routes = [
{
	path: '/:id',
	component: require('./page/room.vue'),
},{
	path: '/cover',
	component: require('./page/cover.vue'),
},{
	path: '/player',
	component: require('./components/player.vue'),
},
{
	path: '*',
	redirect: '/home',
}

]

export default routes;