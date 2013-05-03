from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from pack.models import Schedule

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
	schedules = Schedule.objects.all()
	return render(request, 'schedules.html', {"schedules" : schedules})

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
	return render(request, 'view-schedule.html', {})