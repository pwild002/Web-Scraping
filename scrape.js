var fs = require('fs')
var csvString = require('csv-string')
var nightmare = require ('nightmare')
function scrape () {
	var location ='http://www.independent.co.uk'
	var results = nightmare ()
	.goto(location)
	.wait('body')
	.evaluate(extract)
	.end()
	return results 
}
function extract () {
	var text = document.querySelectorAll('h1')
	var result = Array.from(text).map(element => {
		return [element.innerText]
	})
	return result
}
function run () {
scrape().then(data => {
	var output = csvString.stringify(data)
	fs.appendFileSync('output.csv', output)
  })
}
run()
