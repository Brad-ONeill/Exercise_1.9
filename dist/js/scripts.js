var pokemonRepository=function(){var t=[],o="https://pokeapi.co/api/v2/pokemon/?limit=151";function e(o){t.push(o)}return $("#pokeModal").on("show.bs.modal",function(t){pokemonRepository.loadDetails(t.relatedTarget.getAttribute("data-url")).then(function(t){$("#pokeModalTitle").html(t.name),$("#pokeModalImage").attr("src",t.imageUrl),$("#pokeModalHeight").html(t.height),$("#pokeModalTypes").html(t.types.join(", "))})}),{add:e,getALL:function(){return t},addListItem:function(t){var o=`<li class="list-group-item col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">\n\t\t\t\t\t\t\t<div class="pokedexItem">\n\t\t\t\t\t\t\t\t\t<button aria-label="${t.name}" class="btn btn-info btn-sm col" data-toggle="modal"\n\t\t\t\t\t\t\t\t\tdata-target="#pokeModal"\n\t\t\t\t\t\t\t\t\tdata-url="${t.detailsUrl}">\n\t\t\t\t\t\t\t\t\t\t${t.name}\n\t\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</li>`;$(".list-group").append(o)},loadList:function(){return $.ajax(o).then(function(t){t.results.forEach(function(t){e({name:t.name,detailsUrl:t.url})})})},loadDetails:function(t){var o=t;return $.ajax(o).then(function(t){var o=[];return $.each(t.types,function(t,e){o.push(e.type.name)}),{name:t.name,imageUrl:t.sprites.front_default,height:t.height,types:o}}).catch(function(t){console.error(t)})}}}();pokemonRepository.loadList().then(function(){$.each(pmon,(t,o)=>{pokemonRepository.addListItem(o)})});var pmon=pokemonRepository.getALL();