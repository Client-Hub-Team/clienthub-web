export class GeneralUtil {

    constructor() {}

    getNameInitials = function(name){
        if(name !== undefined && name != null){
            const names = name.split(' ');
            if(names.length >= 2){
                return names[0][0].toUpperCase() + '' + names[names.length - 1][0].toUpperCase();
            }else{
                return names[0][0];
            }
        }else{
            return '';
        }
    }
}


