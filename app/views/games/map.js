function(doc) {
  if (doc._id.substr(0, 6) === "games:") {
    emit(doc._id, {
    	"category": doc.category,
    	"name": doc.name,
    	"publisher": doc.publisher,
    	"release": doc.release,
    	"rate": doc.rate,
    	"console": doc.console,
    	"comments": doc.comments
    });
  };
};