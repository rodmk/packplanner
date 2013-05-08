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
	family_member = get_family_member(request.user)
	if request.method == 'POST':
		name = request.POST['event[title]']
		location = request.POST['event[location]']
		start_time = request.POST['event[startDate]']
		end_time = request.POST['event[endDate]']
		driver_from_id = request.POST['event[driverFrom]']
		driver_to_id = request.POST['event[driverTo]']
		creator = request.user
		going = request.POST['event[going]']
		# schedule_id = request.POST['schedule_id']
		# Schedule schedule = Schedule.objects.get(id=schedule_id)
		# Event event = new Event(name, "", location, datetime.now(), creator, start_time, end_time, schedule)
		# event.save()
		# FamilyEventDetails events_details = new FamilyEventDetails(event=event, family=family_member.family, notes="")
		# events_details.save()
		# if driver_to:
		# 	events_details.driverTo = driver_to
		# 	events_details.save()
		# if driver_from:
		# 	events_details.driverFrom = driver_from
		# 	events_details.save()
		# for child in children_going:
		# 	events_details.child_attendees.add(child)
		# for adult in adults_going:
		# 	events_details.attendees.add(adult)
		id = 0
		return HttpResponse(simplejson.dumps(id))
	events_details = FamilyEventDetails.objects.filter(family=family_member.family)
	return render(request, 'index.html', {"events_details" : events_details, "family" : family_member.family})

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
