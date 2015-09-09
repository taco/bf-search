import assert from 'assert'
import search from '../src/search'

describe('Search ', function() {
    it('should be a function', function() {
        assert.equal(typeof search, 'function')
    })
})

describe('Searching "blue"', function() {
    var result = search({query: 'blue'}, {})
    var {filters: [{searchType, typeId, attributeValue: {name}}]} = result

    it('should return one filter', function() {
        assert.equal(result.filters.length, 1)
    })

    it('should return an attribute type', function() {
        assert.equal(searchType, 'attribute')
    })

    it('should return an filter of the color blue', function () {
        assert.equal(typeId, 'tenant~color')
        assert.equal(name, 'Blue')
    })
})