from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
	return render(request, 'index.html', {})

@login_required
def calendar(request):
	return render(request, 'index.html', {})

@login_required
def contacts(request):
	return render(request, 'contacts.html', {})

@login_required
def inbox(request):
	return render(request, 'inbox.html', {})

@login_required
def schedules(request):
	return render(request, 'schedules.html', {})

@login_required
def settings(request):
	return render(request, 'settings.html', {})

@login_required
def view_contact(request, id):
	return render(request, 'view-contact.html', {})

@login_required
def view_message(request, id):
	return render(request, 'view-message.html', {})

@login_required
def view_schedule(request, id):
	schedules = []
	schedules.append({'id' : 1, 'name': "Soccer"})
	schedules.append({'id' : 2, 'name': "Drama Rehearsals"})
	schedules.append({'id' : 3, 'name': "Girl Scouts"})
	return render(request, 'view-schedule.html', {'schedules' : schedules})