
async function getComments() {
    // let url = 'http://localhost:3333/comments';        
    let url = 'https://raw.githubusercontent.com/viniciuslourencof/interactive-comments-section/main/data.json'
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderComments() {
    let comments = [];
    let commentsObject = getComments();    

    commentsObject.then((value) => {
        comments = value;

        let html = '', currentUsername = comments.currentUser.username, editVisible, replyVisible, deleteVisible, tagVisible;    

        comments.comments.forEach(comment => {

            // verifica se o comentário é do próprio usuário para habilitar/desabilitar botões
            if (comment.user.username == currentUsername) {
                editVisible = "";    
                deleteVisible = "";
                replyVisible = "invisible";
                tagVisible = "";
            } else {
                editVisible = "invisible";    
                deleteVisible = "invisible";
                replyVisible = "";
                tagVisible = "invisible";
            }

            let htmlSegment = 
                `<div class="comment" id="comment_${comment.id}">
                    <div class="comment__score comment__score--desktop">
                        <img src="images/icon-plus.svg" alt="">
                        <span>${comment.score}</span>
                        <img src="images/icon-minus.svg" alt="">
                    </div>
            
                    <div class="comment__container">
                        <div class="comment__topline">
                            <div class="comment__info">
                                <img class="comment__info_avatar" src="${comment.user.image.png}"></img>
                                <div class="comment__info_user">${comment.user.username}</div>
                                <div class="comment__info_tag ${tagVisible}">você</div>
                                <div class="comment__info_date">${comment.createdAt}</div>          
                            </div>        
                            <div class="comment__actions comment__actions--desktop">
                                <button id="buttonReply_${comment.id}" class="comment__actions_button purple_font ${replyVisible}" onclick="replyToComment(${comment.id})"><img src="images/icon-reply.svg" alt="">Responder</button>                        
                                <button id="buttonDelete_${comment.id}" class="comment__actions_button red_font trigger ${deleteVisible}" onclick="toggleModal(${comment.id})"><img src="images/icon-delete.svg" alt="">Deletar</button>    
                                <button id="buttonEdit_${comment.id}" class="comment__actions_button purple_font ${editVisible}" onclick="editComment(${comment.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
                            </div>                  
                        </div>  
                        <div class="comment__text">${comment.content}</div>     

                        <div class="comment__bottomline--mobile">                                                        
                            <div class="comment__score comment__score--mobile">
                                <img src="images/icon-plus.svg" alt="">
                                <span>${comment.score}</span>
                                <img src="images/icon-minus.svg" alt="">
                            </div>                    
                            <div class="comment__actions comment__actions--mobile">
                                <button id="buttonReplyMob_${comment.id}" class="comment__actions_button purple_font ${replyVisible}" onclick="replyToComment(${comment.id})"><img src="images/icon-reply.svg" alt="">Responder</button>                        
                                <button id="buttonDelete_${comment.id}" class="comment__actions_button red_font trigger ${deleteVisible}" onclick="toggleModal(${comment.id})"><img src="images/icon-delete.svg" alt="">Deletar</button>    
                                <button id="buttonEdit_${comment.id}" class="comment__actions_button purple_font ${editVisible}" onclick="editComment(${comment.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
                            </div>                                    
                        </div>    


                    </div>        
                </div>
                
                <div id="replyToComment_${comment.id}" class="comment comment_send invisible">      
                    <img class="comment__info_avatar" src="${comments.currentUser.image.png}"></img>
                    <textarea class="comment__textarea" placeholder="Adicione um comentário..." form=""></textarea>
                    <button class="comment__send_button">Responder</button>      
                </div>            

                <div class="comment invisible" id="updateComment_${comment.id}">
                    <div class="comment__score">
                        <img src="images/icon-plus.svg" alt="">
                        <span>${comment.score}</span>
                        <img src="images/icon-minus.svg" alt="">
                    </div>
            
                    <div class="comment__container">
                        <div class="comment__topline">
                            <div class="comment__info">
                                <img class="comment__info_avatar" src="${comment.user.image.png}"></img>
                                <div class="comment__info_user">${comment.user.username}</div>
                                <div class="comment__info_tag">você</div>
                                <div class="comment__info_date">${comment.createdAt}</div>          
                            </div>        
                            <div class="comment__actions">
                                <button id="buttonEdit_${comment.id}" class="comment__actions_button purple_font ${editVisible} disabled" onclick="editComment(${comment.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
                            </div>                                                                                  
                        </div>  
                        <textarea class="comment__textarea" form="">${comment.content}</textarea> 
                        <button class="comment__send_button">Atualizar</button>                                   
                    </div>        
                </div>`;   
                
            html += htmlSegment;               
                
            comment.replies.forEach(replie => {

                // verifica se o comentário é do próprio usuário para habilitar/desabilitar botões
                if (replie.user.username == currentUsername) {
                    editVisible = "";    
                    deleteVisible = "";
                    replyVisible = "invisible";
                    tagVisible = "";
                } else {
                    editVisible = "invisible";    
                    deleteVisible = "invisible";
                    replyVisible = "";
                    tagVisible = "invisible";                
                }            

                let htmlSegment = 
                    `<div class="comment_reply" id="commentReply_${replie.id}">
                        <div class="comment__score comment__score--desktop">
                            <img src="images/icon-plus.svg" alt="">
                            <span>${replie.score}</span>
                            <img src="images/icon-minus.svg" alt="">
                        </div>
                
                        <div class="comment__container">
                            <div class="comment__topline">
                                <div class="comment__info">
                                    <img class="comment__info_avatar" src="${replie.user.image.png}"></img>
                                    <div class="comment__info_user">${replie.user.username}</div>
                                    <div class="comment__info_tag ${tagVisible}">você</div>
                                    <div class="comment__info_date">${replie.createdAt}</div>          
                                </div>        
                                <div class="comment__actions comment__actions--desktop">
                                    <button id="buttonReply_${replie.id}" class="comment__actions_button purple_font ${replyVisible}" onclick="replyToReply(${replie.id})"><img src="images/icon-reply.svg" alt="">Responder</button>                        
                                    <button id="buttonDelete_${replie.id}" class="comment__actions_button red_font trigger ${deleteVisible}" onclick="toggleModal(${replie.id})"><img src="images/icon-delete.svg" alt="">Deletar</button>    
                                    <button id="buttonEdit_${replie.id}" class="comment__actions_button purple_font ${editVisible}" onclick="editComment(${replie.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
                                </div>                  
                            </div>  
                            <div class="comment__text">${replie.content}</div>     

                            <div class="comment__bottomline--mobile">
                                <div class="comment__score comment__score--mobile">
                                    <img src="images/icon-plus.svg" alt="">
                                    <span>${replie.score}</span>
                                    <img src="images/icon-minus.svg" alt="">
                                </div>                                                    
                                <div class="comment__actions comment__actions--mobile">
                                    <button id="buttonReplyMob_${replie.id}" class="comment__actions_button purple_font ${replyVisible}" onclick="replyToReply(${replie.id})"><img src="images/icon-reply.svg" alt="">Responder</button>                        
                                    <button id="buttonDelete_${replie.id}" class="comment__actions_button red_font trigger ${deleteVisible}" onclick="toggleModal(${replie.id})"><img src="images/icon-delete.svg" alt="">Deletar</button>    
                                    <button id="buttonEdit_${replie.id}" class="comment__actions_button purple_font ${editVisible}" onclick="editComment(${replie.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
                                </div>                                                                       
                            </div>                             
                        </div>          

                        
                    </div>   

                    <div id="replyToReply_${replie.id}" class="comment_reply invisible comment_send_reply">
                        <img class="comment__info_avatar" src="${comments.currentUser.image.png}"></img>
                        <textarea class="comment_reply__textarea" placeholder="Adicione um comentário..." form=""></textarea>
                        <button class="comment__send_button">Responder</button>
                    </div>
                    
                    <div class="comment_reply comment_update invisible" id="updateComment_${replie.id}">
                        <div class="comment__score">
                            <img src="images/icon-plus.svg" alt="">
                            <span>${replie.score}</span>
                            <img src="images/icon-minus.svg" alt="">
                        </div>
                        
                        <div class="comment_update__container">                                                             
                            <div class="comment__topline">
                                <div class="comment__info">
                                    <img class="comment__info_avatar" src="${replie.user.image.png}"></img>
                                    <div class="comment__info_user">${replie.user.username}</div>
                                    <div class="comment__info_tag">você</div>
                                    <div class="comment__info_date">${replie.createdAt}</div>          
                                </div>    
                                <div class="comment__actions button_edit">
                                    <button id="buttonEdit_${replie.id}" class="comment__actions_button purple_font ${editVisible} disabled" onclick="editComment(${replie.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
                                </div>                                                                   
                            </div>         
                            
                            <div class="comment__bottomline">
                                <textarea class="comment_reply__textarea" form="">${replie.content}</textarea>
                                <button class="comment__send_button">Atualizar</button>                                   
                            </div>         
                        </div>                                                                               
                    </div>`                               
                
                html += htmlSegment;                

            })
        });

        htmlSegment =     
            `<div class="comment comment_send">      
                <img class="comment__info_avatar" src="${comments.currentUser.image.png}"></img>
                <textarea class="comment__textarea" placeholder="Adicione um comentário..." form=""></textarea>
                <button class="comment__send_button">Enviar</button>      
            </div>`

        html += htmlSegment;        

        let container = document.querySelector('.comments');
        container.innerHTML = html;            
    
    })
    .catch((err) => {
        console.error(err);
    });                             
    
}

renderComments();

// vai requisitar uma API
async function cadastrar(){
    // recuperar os dados do usuário
    let id = document.getElementById("id").value
    let nome = document.getElementById("nome").value
    let tipo = document.getElementById("tipo").value
    let poder = document.getElementById("poder").value
    let nota = Number(document.getElementById("nota").value)
    let dado
    let metodo // vai conter POST ou PUT
    if (id) { // vai atualizar
        metodo = 'PUT'
        dado = {
            id, nome, tipo, poder, nota
        }
    }
    else { // cadastrar
        metodo = 'POST'
        dado = {
            nome, tipo, poder, nota
        }
    }
    // criar o dado para enviar
    
    // chamar ou consumir a API utilizando fetch
    await fetch('http://localhost:3333/comments', {
        method: metodo,
        body: JSON.stringify(dado),
        headers: {"Content-Type": "application/json; charset=UTF-8"}
    })
    .then(resposta => {
        alert('Cadastro foi realizado com sucesso')
    })
    .catch( error => {
        alert(error)
    })
    consultar()
}
// remove um pokemon do banco de dados
// quem chamar a função remove pode fazer outra ação antes de
// receber resposta
async function remove(){

    let id;
    document.querySelector(".modal").id = id;
        
    // chama a api -> é síncrona (aguardamos o retorna do servidor)
    await fetch(`http://localhost:3333/comments/${id}`, {
        method:'DELETE'
    })
    .then (response => { // quando o servidor retornou        
        renderComments()
    })
    .catch( error => { // houve erro na comunicação com servidor
        alert(`Problema na remoção`)
    })
    
    
}

function atualiza(id, nome, tipo, poder, nota){
    // insere no formulário os dados do pokemon que será atualizado
    document.getElementById("id").value = id
    document.getElementById("nome").value = nome
    document.getElementById("tipo").value = tipo
    document.getElementById("poder").value = poder
    document.getElementById("nota").value = nota
}
