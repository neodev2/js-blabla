var json = {};

var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.responseType = 'json';
xhr.onload = function() {
    if (xhr.status == 200) {
        json = xhr.response;
        sortBySkillAndCreateDOMStructure(json);
    }
};
xhr.send();

function sortBySkillAndCreateDOMStructure(data){
    document.body.innerHTML = '';
    for(let i in data){
        document.body.innerHTML += '<h3>'+i+'</h3>';
        // sort by skill
        var array = [];
        for(let i2 in data[i]){
            array.push([data[i][i2].skill, data[i][i2].icon, i2]);
        }
        array = array.sort(function(a, b){
            return b[0] - a[0];
        });
        // create DOM structure
        for(let i=0; i<array.length; i++){
            document.body.innerHTML +=
            '<div class="item">'+
                '<div class="icon">'+
                    '<img src="'+array[i][1]+'">'+
                    '<div class="skill">'+
                        '<div class="percentage" style="width: '+array[i][0]+'%; background: '+(array[i][0] >= 50? '#00d800' : '#ff5353')+';"></div>'+
                    '</div>'+
                '</div>'+
                '<small>'+array[i][2]+'</small>'+
                '<div class="controls-edit">'+
                    '<div class="increase">+</div>'+
                    '<div class="decrease">-</div>'+
                '</div>'+
            '</div>';
        }
    }
    bindControlsEdit();
}

function bindControlsEdit(){
    var elems = document.querySelectorAll('.controls-edit > div');
    for(let i=0; i<elems.length; i++){
        elems[i].addEventListener('click', function() {
            var className = this.className;
            var small = this.parentElement.parentElement.querySelector('small').innerHTML;
            for(category in json){
                for(key in json[category]){
                    if(key == small){
                        if(className == 'increase'){
                           json[category][small]['skill']++;
                        }
                        else if(className == 'decrease'){
                           json[category][small]['skill']--;
                        }
                        sortBySkillAndCreateDOMStructure(json);
                    }
                }
            }
        }, false);
    }
}


