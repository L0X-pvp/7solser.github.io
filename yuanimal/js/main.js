jQuery(document).ready(function(event){
	var projectsContainer = $('.cd-projects-container'),
		navigation = $('.cd-primary-nav'),
		triggerNav = $('.cd-nav-trigger'),
		logo = $('.cd-logo');
	
	triggerNav.on('click', function(){
		if( triggerNav.hasClass('project-open') ) {
			
			projectsContainer.removeClass('project-open').find('.selected').removeClass('selected').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$(this).children('.cd-project-info').scrollTop(0).removeClass('has-boxshadow');

			});
			triggerNav.add(logo).removeClass('project-open');
		} else {
			
			triggerNav.add(projectsContainer).add(navigation).toggleClass('nav-open');
		}
	});

	projectsContainer.on('click', '.single-project', function(){
		var selectedProject = $(this);
		if( projectsContainer.hasClass('nav-open') ) {
			
			triggerNav.add(projectsContainer).add(navigation).removeClass('nav-open');
		} else {
			
			selectedProject.addClass('selected');
			projectsContainer.add(triggerNav).add(logo).addClass('project-open');
		}
	});

	projectsContainer.on('click', '.cd-scroll', function(){
		
		var visibleProjectContent =  projectsContainer.find('.selected').children('.cd-project-info'),
			windowHeight = $(window).height();

		visibleProjectContent.animate({'scrollTop': windowHeight}, 300); 
	});

	
	var scrolling = false;
	projectsContainer.find('.cd-project-info').on('scroll', function(){
		if( !scrolling ) {
		 	(!window.requestAnimationFrame) ? setTimeout(updateProjectContent, 300) : window.requestAnimationFrame(updateProjectContent);
		 	scrolling = true;
		}
	});

	function updateProjectContent() {
		var visibleProject = projectsContainer.find('.selected').children('.cd-project-info'),
			scrollTop = visibleProject.scrollTop();
		( scrollTop > 0 ) ? visibleProject.addClass('has-boxshadow') : visibleProject.removeClass('has-boxshadow');
		scrolling = false;
	}
});