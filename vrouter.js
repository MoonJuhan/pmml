var body1 = {
	template:
		'<p>im body1</p>'
};

var body2 = {
	template:
		'<p>im body2</p>'
};

var body3 = {
	template: '#vueroutertest'
};

var router = new VueRouter({
	routes: [
		{
			path: '/foo',
			component: body1
		},
		{
			path: '/bar',
			component: body2
		},
		{
			path: '/vrt',
			component: body3
		}
	]
});

var app = new Vue({
	el: '#app',
	router,
	data: {
		armyType: '육군',
		regiment: '이게 되나?'
	}
});