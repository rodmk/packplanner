from django.conf.urls import patterns, include, url
from django.conf import settings
from django.contrib.auth.views import login, logout

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'packplanner.views.index'),
    url(r'^home/$', 'packplanner.views.index'),
    url(r'^calendar/$', 'packplanner.views.calendar'),
    url(r'^editEvent/(\d+)/$', 'packplanner.views.edit_event'),
    url(r'^removeEvent/(\d+)/$', 'packplanner.views.remove_event'),
    url(r'^contacts/$', 'packplanner.views.contacts'),
    url(r'^contact/(\d+)/$', 'packplanner.views.view_contact'),
    url(r'^inbox/$', 'packplanner.views.inbox'),
    url(r'^message/(\d+)/$', 'packplanner.views.view_message'),
    url(r'^schedules/$', 'packplanner.views.schedules'),
    url(r'^schedule/(\d+)/$', 'packplanner.views.view_schedule'),
    url(r'^settings/$', 'packplanner.views.settings'),
    (r'^accounts/login/$',  login),
    (r'^accounts/logout/$', logout, {"next_page" : "/home/"}),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)
