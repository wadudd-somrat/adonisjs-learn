'use strict'

class ItemController {

	index ({ view ,request}) {
    
		//console.log(request.all())
		//console.log(params)


    return view.render('item');
  }

  create({view}){

  	//console.log('test')

  	return view.render('item-add');
  }
}

module.exports = ItemController
