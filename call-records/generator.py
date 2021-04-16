import random, re, json, pyperclip as pype

# copy all from page
url = 'https://www.randomphonenumbers.com/'

def scrape_calls(text):
  "scrapes information from string and returns list of call objects"
  rgx = '(\d{3}-\d{3}-\d{4})\n\n(\w+).*from (.*), (\w+).*,(\w+)'
  matches = re.findall(rgx, text)
  return list(map(lambda m: {
    'number': m[0], 
    'type': m[1],
    'location': m[2],
    'duration': f'{random.randrange(10,90)} min',
    'charge': f'${random.randrange(2,15)}',
  }, matches))

def generate_calls():
  "copies required output for call_data.json"
  pype.copy(
    json.dumps(scrape_calls(pype.paste()), indent=2)
  )

# eg.
# {
  # number: '301-500-8520'
  # type: 'Landline'
  # location: 'Woburn, MA, USA'
  # duration: '4hrs'
  # charge: '$125'
# }

generate_calls()