import colors from './data/colors.json'
import designers from './data/designers.json'
import categories from './data/categories.json'

const COLOR_MAP = buildAttributeMap(colors)
const DESIGNER_MAP = buildAttributeMap(designers)
const CATEGORY_MAP = buildCategoryMap()

export default function (query) {
    var words = query.toLowerCase().split(' ')

    var filters = []
    var categories = []

    while(words.length) {
        let result = loopWords(words)

        if (result.match) {
            if (result.match.searchType === 'attribute') {
                filters.push(result.match)
            } else {
                categories.push(result.match)
            }
            
            words = result.remainder
        } else {
            break
        }
    }

    return {
        filters,
        categories
    }
}

function loopWords(words) {
    for (let i = 0; i < words.length; i++) {
        for (let j = 0; j < i + 1; j++) {
            let startIndex = j
            let endIndex = j + words.length - i
            let subset = words.slice(startIndex, endIndex)

            var match = searchAttributes(subset.join(' '))

            if (match) {
                return {
                    match,
                    remainder: remainder(words, startIndex, endIndex)
                }
            }
        }
    }
    return {
        remainder: []
    }
}

function remainder(words, startIndex, endIndex) {
    if (startIndex === 0) {
        return words.slice(endIndex)
    }
    if (words.length === endIndex) {
        return words.slice(0, startIndex)
    }
    return words.slice(0, startIndex).concat(words.slice(endIndex))
}

function searchAttributes(value) {
    var designer = DESIGNER_MAP.get(value)

    if (designer) {
        return {
            searchType: 'attribute',
            typeId: designers.id,
            attributeValue: designer
        }
    }

    var color = COLOR_MAP.get(value)

    if (color) {
        return {
            searchType: 'attribute',
            typeId: colors.id,
            attributeValue: color
        }
    }

    var category = CATEGORY_MAP.get(value)

    if (category) {
        return {
            searchType: 'category',
            category
        }
    }
}

function buildAttributeMap(attributes) {
    var map = new Map()
    attributes.items.forEach(a => map.set(a.name.toLowerCase(), a))
    return map
} 

function buildCategoryMap() {
    var map = new Map()
    categories.forEach(c => map.set(c.name.toLowerCase(), c))
    return map
}