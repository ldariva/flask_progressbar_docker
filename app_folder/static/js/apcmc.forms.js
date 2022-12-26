var country_select = document.getElementById("country")
var site_select = document.getElementById("site");
var plant_select = document.getElementById("plant");
var ctrl_select = document.getElementById("ctrl");
var subctrl_select = document.getElementById("subctrl")
var kpi_select = document.getElementById("kpi")
var expression = document.getElementById("expression")
var description = document.getElementById("description")
var reason = document.getElementById("reason")
var category_select = document.getElementById("category")
var new_reason = document.getElementById("new_reason")
var server = document.getElementById("server")
var eu = document.getElementById("eu")
var agg = document.getElementById("agg")

var IsAW_Btn = document.getElementById('IsAW_flag-0')
var IsNotAw_Btn = document.getElementById('IsAW_flag-1')
var IsIS21_Btn = document.getElementById('IsPI_flag-0')
var IsISPI_Btn = document.getElementById('IsPI_flag-1')
var coverage_yesBtn = document.getElementById('coverage_flag-0')
var coverage_noBtn = document.getElementById('coverage_flag-1')

var pages_for_subctrl = ['/config_kpi','/config_cond']
var pages_for_categories = ['/config_cond']
var pages_for_servers = ['/config_servers']

var site1_id = -1
var plant1_id = -1
var ctrl1_id = -1
var subctrl1_id = -1
var kpi1_id = -1
var cond1_id = -1

if (pages_for_subctrl.indexOf(window.location.pathname)!=-1){

    country_select.onchange = function(){
        country_id = country_select.value
        
        get_options_sites(country_id,1);
    }

    site_select.onchange = function(){
        var country_id = country_select.value
        var site_id = site_select.value

        get_options_plants(country_id,site_id,1);
    };

    plant_select.onchange = function(){
        var country_id = country_select.value
        var site_id = site_select.value
        var plant_id = plant_select.value;

        if(window.location.pathname=='/config_noawctrl'){
            get_options_noawctrl(plant_id,1)
        }else{
            get_options_ctrl(country_id,site_id,plant_id,1)
        }
    };

    ctrl_select.onchange = function(){
        var country_id = country_select.value
        var site_id = site_select.value
        var plant_id = plant_select.value;
        var ctrl_id = ctrl_select.value;

        if(window.location.pathname=='/config_noawctrl'){
            get_noaw_info(ctrl_id)
        }
        else{
            get_options_subctrl(country_id,site_id,plant_id,ctrl_id,1)
        }
    };


    subctrl_select.onchange = function(){
        if(window.location.pathname!='/config_noawctrl'){
            var subctrl_id = subctrl_select.value;
    
            get_options_kpi(subctrl_id,1)
        }
    }
    
    kpi_select.onchange = function(){
        var kpi_id = kpi_select.value;
    
        get_kpi_expression(kpi_id)
    }

}

if (pages_for_categories.indexOf(window.location.pathname)!=-1){
    
    category_select.onchange = function(){
        var category_id = category_select.value;

        get_options_reasons(category_id)

    }
}

if (pages_for_servers.indexOf(window.location.pathname)!=-1){

    server.onclick = function(){
        var host_id = server.value;
        get_server_info(host_id)
        //alert(host);
    }

    IsAW_Btn.onclick = function(){
        IsIS21_Btn.checked = true
        IsISPI_Btn.checked = false
    }
}

function get_options_sites(country_id,flag){
    // the parameter flag indicate if we are running this function
    // with country_id from local storage. If it is 0 it means that 
    // we need to call all functions in a row.
    switch (window.location.pathname){
    case '/config_kpi':
        sessionStorage.setItem('country_id1',country_id)
        break;
    case '/config_cond':
        sessionStorage.setItem('country_id2',country_id)
        break;
    case '/config_noawctrl':
        sessionStorage.setItem('country_id3',country_id)
    }
    
    if(flag==1){
        site1_id=-1
    }
    //get sites
    fetch('/sites/'+country_id).then(function(response){
        response.json().then(function(data){
            var optionHTML='';
            
            for (var site of data.sites){
                optionHTML += '<option value=' + parseInt(site.id) + '>' + site.site + '</option>'
                if (site1_id==-1){
                    site1_id=site.id
                }
            }
            site_select.innerHTML = optionHTML;
            
            switch (window.location.pathname){
            case '/config_kpi':
                var site_id_stored = sessionStorage.getItem('site_id1')
                break;
            case '/config_cond':
                var site_id_stored = sessionStorage.getItem('site_id2')
                break;
            case '/config_noawctrl':
                var site_id_stored = sessionStorage.getItem('site_id3')
            }

            if(flag==1){
                site_select.value=site1_id
            }else{
                site_select.value=site_id_stored
            }

            if(flag==1){
                get_options_plants(country_id,site1_id,1) 
            }                 
        })       
    });
}

function get_options_plants(country_id,site_id,flag){
    // the parameter flag indicate if we are running this function
    // with country_id and site_id from local storage. If it is 0 it means that 
    // we need to call all functions in a row.
    
    switch (window.location.pathname){
    case '/config_kpi':
        sessionStorage.setItem('site_id1',site_id)
        break;
    case '/config_cond':
        sessionStorage.setItem('site_id2',site_id)
        break;
    case '/config_noawctrl':
        sessionStorage.setItem('site_id3',site_id)
    }

    if(flag==1){
        plant1_id=-1
    }
    //get plant;
    fetch('/plants/'+country_id+'/'+site_id).then(function(response){
        response.json().then(function(data){
            var optionHTML='';
            
            for (var plant of data.plants){
                optionHTML += '<option value=' + parseInt(plant.id) + '>' + plant.plant + '</option>'
                if (plant1_id==-1){
                    plant1_id=plant.id
                }
            }
            plant_select.innerHTML = optionHTML;

            switch (window.location.pathname){
            case '/config_kpi':
                var plant_id_stored = sessionStorage.getItem('plant_id1')
                break;
            case '/config_cond':
                var plant_id_stored = sessionStorage.getItem('plant_id2')
                break;
            case '/config_noawctrl':
                var plant_id_stored = sessionStorage.getItem('plant_id3')
            }

            if(flag==1){
                plant_select.value=plant1_id
            }else{
                plant_select.value=plant_id_stored
            }

            if(flag==1){
                if(window.location.pathname=='/config_noawctrl'){
                    get_options_noawctrl(plant1_id,1)   
                }else{
                    get_options_ctrl(country_id,site_id,plant1_id,1)
                }
                
            }              
        })       
    });
    site1_id = -1;
};

function get_options_ctrl(country_id,site_id,plant_id,flag){
    // the parameter flag indicate if we are running this function
    // with country_id,site_id and plant_id from local storage. If it is 0 it means that 
    // we need to call all functions in a row.
    switch (window.location.pathname){
    case '/config_kpi':
        sessionStorage.setItem('plant_id1',plant_id)
        break;
    case '/config_cond':
        sessionStorage.setItem('plant_id2',plant_id)
    }
    
    if(flag==1){
        ctrl1_id=-1
    }
    //get controllers

    fetch('/ctrls/'+country_id+'/'+site_id+'/'+plant_id).then(function(response){
        response.json().then(function(data){
            var optionHTML='';
            for (var ctrl of data.ctrls){
                optionHTML += '<option value=' + parseInt(ctrl.id) + '>' + ctrl.ctrl + '</option>'
                if (ctrl1_id == -1){
                    ctrl1_id=ctrl.id
                }
            }
            ctrl_select.innerHTML = optionHTML;
            
            switch (window.location.pathname){
            case '/config_kpi':
                var ctrl_id_stored = sessionStorage.getItem('ctrl_id1')
                break;
            case '/config_cond':
                var ctrl_id_stored = sessionStorage.getItem('ctrl_id2')
                break;
            case '/config_noawctrl':
                var ctrl_id_stored = sessionStorage.getItem('ctrl_id3')
            }

            if(flag==1){
                ctrl_select.value=ctrl1_id
            }else{
                ctrl_select.value=ctrl_id_stored
            }
            
            if(flag==1){
                get_options_subctrl(country_id,site_id,plant_id,ctrl1_id,1)
            }
        })
    }); 
    plant1_id = -1;
}

function get_options_subctrl(country_id,site_id,plant_id,ctrl_id,flag){
    // the parameter flag indicate if we are running this function
    // with country_id,site_id,plant_id and ctrl_id from local storage. If it is 0 it means that 
    // we need to call all functions in a row.
    
    switch (window.location.pathname){
    case '/config_kpi':
        sessionStorage.setItem('ctrl_id1',ctrl_id)
        break;
    case '/config_cond':
        sessionStorage.setItem('ctrl_id2',ctrl_id)
    }

    if(flag==1){
        subctrl1_id=-1
    }
    //get subcontrollers
    fetch('/subctrls/'+country_id+'/'+site_id+'/'+plant_id+'/'+ctrl_id).then(function(response){
        response.json().then(function(data){
            var optionHTML='';
            for (var sub of data.subctrls){
                optionHTML += '<option value=' + parseInt(sub.id) + '>' + sub.subctrl + '</option>'
                if (subctrl1_id == -1){
                    subctrl1_id=sub.id
                }
            }
            subctrl_select.innerHTML = optionHTML;

            switch (window.location.pathname){
            case '/config_kpi':
                var subctrl_id_stored = sessionStorage.getItem('subctrl_id1')
                break;
            case '/config_cond':
                var subctrl_id_stored = sessionStorage.getItem('subctrl_id2')
            }

            if(flag==1){
                subctrl_select.value = subctrl1_id
            }else{
                subctrl_select.value = subctrl_id_stored
            }
            
            if(flag==1){
                get_options_kpi(subctrl1_id,1)
            }
        })
    });
    ctrl1_id=-1;
}

function get_options_kpi(subctrl_id,flag){
    // the parameter flag indicate if we are running this function
    // with country_id,site_id,plant_id,ctrl_id and subctrl_id from local storage. If it is 0 it means that 
    // we need to call all functions in a row.
    
    switch (window.location.pathname){
    case '/config_kpi':
        sessionStorage.setItem('subctrl_id1',subctrl_id)
        break;
    case '/config_cond':
        sessionStorage.setItem('subctrl_id2',subctrl_id)
    }

    if(flag==1){
        kpi1_id=-1
    }
    //get kpis
    switch (window.location.pathname){
    case '/config_kpi':
    //if(window.location.pathname=='/config_kpi'){
        fetch('/kpis/'+subctrl_id).then(function(response){
            response.json().then(function(data){
                var optionHTML='';
                for (var kpi of data.kpis){
                    optionHTML += '<option value=' + parseInt(kpi.id) + '>' + kpi.tag_id + '</option>'
                    if (kpi1_id == -1){
                        kpi1_id=kpi.id
                    }
                }
    
                if (optionHTML==''){
                    optionHTML='<option value=-1>null</option>'
                    kpi1_id=-1
                }
                    
                kpi_select.innerHTML = optionHTML;
                
                var kpi_id_stored = sessionStorage.getItem('kpi_id')

                if(flag==1){
                    kpi_select.value = kpi1_id
                    get_kpi_expression(kpi1_id)
                }else{
                    kpi_select.value = kpi_id_stored
                    get_kpi_expression(kpi_id_stored)
                }
            })
        });
    //get conditionals
    break;
    case '/config_cond':
    //else{
        fetch('/conditionals/'+subctrl_id).then(function(response){
            response.json().then(function(data){
                var optionHTML='';
                for (var cond of data.conditionals){
                    optionHTML += '<option value=' + parseInt(cond.id) + '>' + cond.cond_id + '</option>'
                    if (cond1_id == -1){
                        cond1_id=cond.id
                    }
                }
    
                if (optionHTML==''){
                    optionHTML='<option value=-1>null</option>'
                    cond1_id=-1
                }
                    
                kpi_select.innerHTML = optionHTML;
                
                var cond_id_stored = sessionStorage.getItem('cond_id')

                if(flag==1){
                    kpi_select.value = cond1_id//cond1_id
                    get_kpi_expression(cond1_id)
                }else{
                    kpi_select.value = cond_id_stored//cond_id_stored
                    get_kpi_expression(cond_id_stored)
                }
            })
        });
    subctrl1_id=-1;
    }
}

function get_options_servers(){
    fetch('/servers_list').then(function(response){
        response.json().then(function(data){
            var optionHTML='';
            for (var s of data.server){
                optionHTML += '<option value=' + parseInt(s.id) + '>' +s.hostname + '</option>'
            }
            server.innerHTML = optionHTML
    })
})
}

function get_server_info(host_id){
    fetch('/server_options/'+host_id).then(function(response){
        response.json().then(function(data){

            new_server = document.getElementById('new_server')

            for (var s of data.server){
                
                new_server.value = s.hostname

                if (s.isaw==1) {
                    IsAW_Btn.checked = true
                    IsNotAw_Btn.checked = false
                }
                else{
                    IsAW_Btn.checked = false
                    IsNotAw_Btn.checked = true
                }

                if (s.ispi==1) {
                    IsISPI_Btn.checked = true
                    IsIS21_Btn.checked = false
                }
                else{
                    IsISPI_Btn.checked = false
                    IsIS21_Btn.checked = true
                }
            }
        })
    });
}

function get_kpi_expression(kpi_id){
    //get kpi expression and description
    expression.value = ''

    switch (window.location.pathname){
    case '/config_kpi':
    //if(window.location.pathname=='/config_kpi'){
        description.value = ''
        sessionStorage.setItem('kpi_id',kpi_id)
        fetch('/kpi_info/'+kpi_id).then(function(response){
            response.json().then(function(data){
                
                for (var kpi_info of data.kpi_info){
                    expression.value = kpi_info.expression
                    description.value = kpi_info.description
                    server.value = kpi_info.host_id
                    eu.value = kpi_info.eu_id
                    if (kpi_info.agg == 'AVG'){
                        agg.value=1;
                    }else{
                        agg.value=2;
                    }
                }
            })
        });
        kpi1_id=-1
        break;
    case '/config_cond':
    //}else{
        new_reason.value = ''
        sessionStorage.setItem('cond_id',kpi_id)
        fetch('/cond_info/'+kpi_id).then(function(response){
            response.json().then(function(data){
    
                for (var cond_info of data.cond_info){
                    expression.value = cond_info.expression
                    category.value = cond_info.category_id
                    //filter reason options based on the category
                    get_options_reasons(cond_info.category_id)
                    reason.value = cond_info.reason_id
                    server.value = cond_info.host_id
                    
                    if (cond_info.coverage_flag==1) {
                        coverage_yesBtn.checked = true
                        coverage_noBtn.checked = false
                    }
                    else{
                        coverage_yesBtn.checked = false
                        coverage_noBtn.checked = true
                    }
                }
            })
        });
        cond1_id=-1  
    }
}

function get_options_noawctrl(plant_id,flag){

    sessionStorage.setItem('plant_id3',plant_id)

    if(flag==1){
        ctrl1_id=-1
    }
    fetch('/noaw_options/'+plant_id).then(function(response){
        response.json().then(function(data){
            var optionHTML='';
            for (var ctrl of data.noaw_options){
                optionHTML += '<option value=' + parseInt(ctrl.ctrl_id) + '>' + ctrl.ctrl + '</option>'
                if (ctrl1_id == -1){
                    ctrl1_id=ctrl.ctrl_id
                }
            }
            ctrl_select.innerHTML = optionHTML;[]
            
            var ctrl_id_stored = sessionStorage.getItem('ctrl_id3')

            if(flag==1){
                ctrl_select.value = ctrl1_id
                get_noaw_info(ctrl1_id)
            }else{
                ctrl_select.value = ctrl_id_stored
                get_noaw_info(ctrl_id_stored)
            }
        })
    });
}

function get_noaw_info(ctrl_id){

    sessionStorage.setItem('ctrl_id3',ctrl_id)
    expression.value = ''
    server.value = -1
    fetch('/noaw_info/'+ctrl_id).then(function(response){
        response.json().then(function(data){
            for (var info of data.noaw_info){
                ctrl_select.value = ctrl_id
                expression.value = info.expression
                server.value = info.server_id
                yesBtn = document.getElementById('active_flag-0')
                noBtn = document.getElementById('active_flag-1')
                if (info.isactive==1) {
                    yesBtn.checked = true
                    noBtn.checked = false
                }
                else{
                    yesBtn.checked = false
                    noBtn.checked = true
                }
            }
        })
    });
}

function get_options_reasons(category_id){
    fetch('/reasons_options/'+category_id).then(function(response){
        response.json().then(function(data){

            var optionHTML='';
            for (var r of data.reason){
                optionHTML += '<option value=' + parseInt(r.id) + '>' + r.reason + '</option>'
            }
            reason.innerHTML = optionHTML;
        })
    });
}

function init_form(){
    //alert(window.location.pathname)
    try{
        var first_load = sessionStorage.getItem('first_load')
    }catch{
        first_load = 0
    }
    if ((first_load==0) || (first_load===null)){
        sessionStorage.setItem('first_load',1)
        get_options_sites(1,1)
    }else{
        switch (window.location.pathname){
        case '/config_kpi':
            var country_id_stored = sessionStorage.getItem('country_id1')
            var site_id_stored = sessionStorage.getItem('site_id1')
            var plant_id_stored = sessionStorage.getItem('plant_id1')
            var ctrl_id_stored = sessionStorage.getItem('ctrl_id1')
            var subctrl_id_stored = sessionStorage.getItem('subctrl_id1')
            var kpi_id_stored = sessionStorage.getItem('kpi_id')
            break;
        case '/config_cond':
            var country_id_stored = sessionStorage.getItem('country_id2')
            var site_id_stored = sessionStorage.getItem('site_id2')
            var plant_id_stored = sessionStorage.getItem('plant_id2')
            var ctrl_id_stored = sessionStorage.getItem('ctrl_id2')
            var subctrl_id_stored = sessionStorage.getItem('subctrl_id2')
            var cond_id_stored = sessionStorage.getItem('cond_id')
            break;
        case '/config_noawctrl':
            var country_id_stored = sessionStorage.getItem('country_id3')
            var site_id_stored = sessionStorage.getItem('site_id3')
            var plant_id_stored = sessionStorage.getItem('plant_id3')
            var ctrl_id_stored = sessionStorage.getItem('ctrl_id3')
        }
        
        if (pages_for_subctrl.indexOf(window.location.pathname)!=-1){
            if ((country_id_stored==null)||(site_id_stored==null)||(plant_id_stored==null)||(ctrl_id_stored==null)||(subctrl_id_stored==null)&&((kpi_id_stored==null)||(cond_id_stored==null))){
                get_options_sites(1,1)
            }else{
                get_options_sites(country_id_stored,0)
                get_options_plants(country_id_stored,site_id_stored,0)
                get_options_ctrl(country_id_stored,site_id_stored,plant_id_stored,0)
                switch (window.location.pathname){
                case '/config_kpi':
                    get_options_subctrl(country_id_stored,site_id_stored,plant_id_stored,ctrl_id_stored,0)
                    get_options_kpi(subctrl_id_stored,0)
                    get_kpi_expression(kpi_id_stored)
                    break;
                case '/config_cond':
                    get_options_subctrl(country_id_stored,site_id_stored,plant_id_stored,ctrl_id_stored,0)
                    get_options_kpi(subctrl_id_stored,0)
                    get_kpi_expression(cond_id_stored)
                    break;
                }            
            }
        }
        else if(pages_for_servers.indexOf(window.location.pathname)!=-1){
            server.value=1
            get_options_servers()
            get_server_info(1)
        }
        else{ // options of non aw controllers
            if ((country_id_stored==null)||(site_id_stored==null)||(plant_id_stored==null)||(ctrl_id_stored==null)){
                get_options_sites(1,1)
            }else{
                get_options_sites(country_id_stored,0)
                get_options_plants(country_id_stored,site_id_stored,0)
                get_options_noawctrl(plant_id_stored,0)
                get_noaw_info(ctrl_id_stored)
            }
        }
    }    
}

function confirm_delete_kpi(){
    if (confirm("Are you sure you want to delete?")==true){
        var kpi_id = kpi_select.value;
        fetch('/delete_kpi/'+kpi_id).then(function(response){
            response.json().then(function(data){
                for (var msg of data.kpi_delete){
                    alert(msg.msg)
                }
            })
        });
    }else{
        alert("Delete Canceled.")
    }
}

function confirm_delete_cond(){
    if (confirm("Are you sure you want to delete?")==true){
        var kpi_id = kpi_select.value;
        fetch('/delete_cond/'+kpi_id).then(function(response){
            response.json().then(function(data){
                for (var msg of data.cond_delete){
                    alert(msg.msg)
                }
            })
        });
    }else{
        alert("Delete Canceled.")
    }
}

function confirm_delete_noaw(){
    if (confirm("Are you sure you want to delete?")==true){
        var ctrl_id = ctrl_select.value;
        fetch('/delete_noawctrl/'+ctrl_id).then(function(response){
            response.json().then(function(data){
                for (var msg of data.noaw_delete){
                    alert(msg.msg)
                }
            })
        });
    }else{
        alert("Delete Canceled.")
    }
}

function confirm_delete_server(){

    if (confirm("Are you sure you want to delete?")==true){
        var server_id = server.value;
        fetch('/delete_server/'+server_id).then(function(response){
            response.json().then(function(data){
                for (var msg of data.server_delete){
                    alert(msg.msg)
                }
            })
        });
    }else{
        alert("Delete Canceled.")
    }
}

function treeview_test(k1,k2){
    sessionStorage.setItem('k1',k1)
    sessionStorage.setItem('k2',k2)
    //alert(k1 + ' - ' + k2)
}
