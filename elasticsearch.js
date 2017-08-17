var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info',
    // apiVersion: '5.5'

});

var indexName = "randomindex";

/**
* Delete an existing index
*/
function deleteIndex() {
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initMapping() {
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "document",
        body: {
            properties: {
                title: { type: "string" },
                description: { type: "string" },
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple"
                }
            }
        }
    });
}
exports.initMapping = initMapping;

function addDocument(document) {
    return elasticClient.index({
        index: indexName,
        type: "document",
        body: {
            title: document.title,
            description: document.description,
            suggest: {
                input: document.title.split(" ")
            }
        }
    });
}
exports.addDocument = addDocument;

function getSuggestions(input) {
    console.log(input, 'int')
    return elasticClient.suggest({
        index: indexName,
        body: {
            docsuggest: {
                text: input,
                completion: {
                    field: "suggest",
                    fuzzy: true
                }
            }
        }
    })
}
exports.getSuggestions = getSuggestions;