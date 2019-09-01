module.exports = (app, db) => {
    app.get( "/article", (req, res) =>
      db.Article.findAll().then( (result) => res.json(result) )
    );
  
    app.get( "/article/:id", (req, res) =>
      db.Article.findByPk(req.params.id).then( (result) => res.json(result))
    );
  
    app.post("/Article", (req, res) => 
      db.Article.create({
        title: req.body.title,
      }).then( (result) => res.json(result) )
    );
  
    app.put( "/article/:id", (req, res) =>
      db.Article.update({
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    );
  
    app.delete( "/article/:id", (req, res) =>
      db.Article.destroy({
        where: {
          id: req.params.id
        }
      }).then( (result) => res.json(result) )
    );
  }