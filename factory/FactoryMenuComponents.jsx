var FactoryMenuComponents = function(){

    return{
        createGroup : function(tab, label){
            var group = tab.add("group");
            group.orientation = "row";
            group.add("statictext", undefined, label);
            return group;
        }
    }
};