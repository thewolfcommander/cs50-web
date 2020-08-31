from django.shortcuts import render
from django import forms
from django.http import HttpResponseRedirect
from django.core.exceptions import ValidationError
import random
import markdown2

from . import util


class SearchBar(forms.Form):
    q = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Search Encyclopedia'}))

class NewPageForm(forms.Form):
    title = forms.CharField(label="Page Title")
    content = forms.CharField(widget=forms.Textarea, label="Markdown Content")

    def clean_title(self):
        title = self.cleaned_data["title"]
        if title.lower() in [entry.lower() for entry in util.list_entries()]:
            raise ValidationError("An entry already exists with the same title!")
        return title

def search(request):
    form = SearchBar(request.POST)
    if form.is_valid():
        q = form.cleaned_data["q"].lower()
        
        # Exact match - redirect to entry
        if q in [entry.lower() for entry in util.list_entries()]:
            return HttpResponseRedirect(q)

        # No exact match - list all substring matches
        search_results = [entry for entry in util.list_entries() if q in entry.lower()]
        return render(request, "encyclopedia/index.html", {
            "entries": search_results,
            "search_form": SearchBar(),
            "home": False
        })

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries(),
        "search_form": SearchBar(),
        "home": True
    })

def entry(request, title):
    return render(request, "encyclopedia/entry.html", {
        "title": title.capitalize(),
        "entry": markdown2.markdown(util.get_entry(title)),
        "search_form": SearchBar()
    })

def lucky(request):
    page = random.choice(util.list_entries())
    return HttpResponseRedirect(page)

def new(request):
    if request.method == "POST":
        form = NewPageForm(request.POST)

        if form.is_valid():
            title = form.cleaned_data["title"]
            content = form.cleaned_data["content"]

            # Save new entry to disk
            with open(f"./entries/{title}.md", "w") as f:
                f.write(content)

            # Redirect to new entry's page
            return HttpResponseRedirect(title)
        
        else:
            # If form is invalid, re-render page with existing information
            return render(request, "encyclopedia/new.html", {
                "new_form": form,
                "search_form": SearchBar()
            })

    return render(request, "encyclopedia/new.html", {
        "new_form": NewPageForm(),
        "search_form": SearchBar()
    })
