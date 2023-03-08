import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

import cors from 'cors';

(async () => {

  // Init the Express application
  const app = express();
  
  // apply cors
  app.use(cors())

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // TODO
  app.get('/filteredimage', async function (req: any, res: any){
    const { image_url } = req.query
    if ( !image_url ) {
      res.status(200).send('image_url is required!')
    }
    try {            
      filterImageFromURL(image_url)
        .then(function(data: any){
          //console.log('data', data)
          res.status(200).sendFile(data, function(){
            //console.log('remove')
            deleteLocalFiles([data])
          })        
        })
        .catch((err) => {
          res.status(200).send('Cannot load file')                    
        })    
    } catch (error) {      
      res.status(500).send('error -- '+ error)
    }    
    
  })

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: any, res: any ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();