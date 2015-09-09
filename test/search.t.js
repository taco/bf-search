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

describe('Searching "calvin klein blue dresses"', function() {
    var result = search({query: 'calvin klein blue dresses'}, {})
    var {
            filters: [
                {searchType: ckType, typeId: ckTypeId, attributeValue: {name: ckName}},
                {searchType: bType, typeId: bTypeId, attributeValue: {name: bName}}
            ],
            categories: [
                {category: {name: categoryName}}
            ]
        } = result

    it('should return two filters', function() {
        assert.equal(result.filters.length, 2)
    })

    it('should return one category', function() {
        assert.equal(result.categories.length, 1)
    })

    it('should return a filter of the designer calvin klein', function() {
        assert.equal(ckType, 'attribute')
        assert.equal(ckTypeId, 'tenant~brand')
        assert.equal(ckName, 'Calvin Klein')
    })

    it('should return a filter of the color blue', function() {
        assert.equal(bType, 'attribute')
        assert.equal(bTypeId, 'tenant~color')
        assert.equal(bName, 'Blue')
    })

    it('should return a category with the name dresses', function() {
        assert.equal(categoryName, 'Dresses')
    })
})