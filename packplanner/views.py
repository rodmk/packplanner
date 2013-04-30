from django.shortcuts import render

def index(request):
    return render(request, 'index.html', {})

def calendar(request):
    return render(request, 'index.html', {})

def contacts(request):
    return render(request, 'contacts.html', {})

def inbox(request):
    return render(request, 'inbox.html', {})

def schedules(request):
    return render(request, 'schedules.html', {})

def settings(request):
    return render(request, 'settings.html', {})