from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect, Http404
from pack.models import *
from django.shortcuts import *
from django.utils import simplejson

@login_required
def index(request):
	return HttpResponseRedirect('/calendar/')

@login_required
def calendar(request):
	if request.method == 'POST':
		event = request.POST['event[title]']
		print event
		id = 0
		return HttpResponse(simplejson.dumps(id))
	family_member = get_family_member(request.user)
	if family_member == None:
		events_details = []
	else:
		events_details = FamilyEventDetails.objects.filter(family=family_member.family)
	return render(request, 'index.html', {"events_details" : events_details})

@login_required
def contacts(request):
	family_member = get_family_member(request.user)
	contacts = family_member.family.contacts.all()
	return render(request, 'contacts.html', {"contacts" : contacts})

@login_required
def inbox(request):
	family_member = get_family_member(request.user)
	messages = family_member.family.received_messages.filter(in_inbox=True)
	return render(request, 'inbox.html', {"messages" : messages})

@login_required
def schedules(request):
	family_member = get_family_member(request.user)
	if family_member == None:
		schedules_details = []
	else:
		schedules_details = FamilyScheduleDetails.objects.filter(family=family_member.family)
	return render(request, 'schedules.html', {"schedules_details" : schedules_details})

@login_required
def settings(request):
	family_member = get_family_member(request.user)
	form = FamilyMemberForm(request.POST or None, instance=family_member)
	if form.is_valid():
		form.save()
	return render(request, 'settings.html', {"user": get_family_member(request.user), "form": form})

@login_required
def view_contact(request, id):
	return render(request, 'view-contact.html', {})

@login_required
def view_message(request, id):
	message = Message.objects.get(id=id)
	family_member = get_family_member(request.user)
	return render(request, 'view-message.html', {"message" : message})

@login_required
def view_schedule(request, id):
	family_member = get_family_member(request.user)

	schedule = Schedule.objects.get(id=id)
	return render(request, 'view-schedule.html', {"schedule" : schedule})

def get_family_member(user):
	family_member = user.user_account
	return family_member
