from django.conf.urls import patterns, include, url
from django.conf import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'packplanner.views.index'),
    url(r'^home/$', 'packplanner.views.index'),
    url(r'^calendar/$', 'packplanner.views.calendar'),
    url(r'^contacts/$', 'packplanner.views.contacts'),
    url(r'^inbox/$', 'packplanner.views.inbox'),
    url(r'^schedules/$', 'packplanner.views.schedules'),
    url(r'^settings/$', 'packplanner.views.settings'),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)
