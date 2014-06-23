###
A mixin that enriches a view that is attached to a model property.

The property name by default is taken from the parentView unless explictly
    defined in the `property` variable.

This mixin also binds a property named `errors` to the model's `model.errors.@propertyName` array
###
Em.Forms.HasPropertyMixin = Em.Mixin.create
    #Can be overriden by views
    property: undefined

    propertyName: (->
        if @get('property')
            @get('property')
        else if @get('parentView.property')
            @get('parentView.property')
        else
            Em.assert false, 'Property could not be found.'
    ).property('parentView.property')

    name: Em.computed.defaultTo 'propertyName'

    init: ->
        @_super()
        Em.Binding.from('model.errors.' + @get('propertyName')).to('errors').connect(this)
