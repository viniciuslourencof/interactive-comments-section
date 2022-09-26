function toggleModal(id) {        
    document.querySelector(".modal").classList.toggle("show-modal");        

    // if (!id)
    //     document.querySelector(".modal").classList

    if (document.getElementById("buttonDelete_"+id).classList.contains('disabled')) {
        document.getElementById("buttonDelete_"+id).classList.remove('disabled');        
    } else {
        document.getElementById("buttonDelete_"+id).classList.add('disabled');                
    }           
}

function windowOnClick(event) {
    if (event.target === document.querySelector(".modal")) {
        toggleModal();
    }
}

function editComment(id) {
    if (document.getElementById("buttonEdit_"+id).classList.contains('disabled')) {

        document.getElementById("buttonEdit_"+id).classList.remove('disabled');
        document.getElementById("updateComment_"+id).classList.add('invisible');        

        if (document.getElementById("comment_"+id))     
            document.getElementById("comment_"+id).classList.remove('invisible');

        if (document.getElementById("commentReply_"+id))                        
            document.getElementById("commentReply_"+id).classList.remove('invisible');     

    } else {

        document.getElementById("buttonEdit_"+id).classList.add('disabled'); 
        document.getElementById("updateComment_"+id).classList.remove('invisible');        

        if (document.getElementById("comment_"+id))
            document.getElementById("comment_"+id).classList.add('invisible');                

        if (document.getElementById("commentReply_"+id))            
            document.getElementById("commentReply_"+id).classList.add('invisible');                

    }         
}

function replyToComment (id) {       
    if (document.getElementById("buttonReply_"+id).classList.contains('disabled')) {
        document.getElementById("buttonReply_"+id).classList.remove('disabled');
        document.getElementById("replyToComment_"+id).classList.add('invisible');        
    } else {
        document.getElementById("buttonReply_"+id).classList.add('disabled');        
        document.getElementById("replyToComment_"+id).classList.remove('invisible');        
    }        
}

function replyToReply (id) {   
    
    if (document.getElementById("buttonReply_"+id).classList.contains('disabled')) {
        document.getElementById("buttonReply_"+id).classList.remove('disabled');
        document.getElementById("replyToReply_"+id).classList.add('invisible');        
    } else {
        document.getElementById("buttonReply_"+id).classList.add('disabled');        
        document.getElementById("replyToReply_"+id).classList.remove('invisible');        
    }        
}

async function getComments() {
    let url = 'https://raw.githubusercontent.com/viniciuslourencof/interactive-comments-section/main/data.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderComments() {
    let comments = await getComments();
    let html = '', currentUsername = comments.currentUser.username, editVisible, replyVisible, deleteVisible;
    

    comments.comments.forEach(comment => {

        // verifica se o comentário é do próprio usuário para habilitar/desabilitar botões
        if (comment.user.username == currentUsername) {
            editVisible = "";    
            deleteVisible = "";
            replyVisible = "invisible";
        } else {
            editVisible = "invisible";    
            deleteVisible = "invisible";
            replyVisible = "";
        }

        let htmlSegment = 
            `<div class="comment" id="comment_${comment.id}">
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
                            <div class="comment__info_date">${comment.createdAt}</div>          
                        </div>        
                        <div class="comment__actions">
                            <button id="buttonReply_${comment.id}" class="comment__actions_button purple_font ${replyVisible}" onclick="replyToComment(${comment.id})"><img src="images/icon-reply.svg" alt="">Responder</button>                        
                            <button id="buttonDelete_${comment.id}" class="comment__actions_button red_font trigger ${deleteVisible}" onclick="toggleModal(${comment.id})"><img src="images/icon-delete.svg" alt="">Deletar</button>    
                            <button id="buttonEdit_${comment.id}" class="comment__actions_button purple_font ${editVisible}" onclick="editComment(${comment.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
                        </div>                  
                    </div>  
                    <div class="comment__text">${comment.content}</div>     
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
            } else {
                editVisible = "invisible";    
                deleteVisible = "invisible";
                replyVisible = "";
            }            

            let htmlSegment = 
                `<div class="comment_reply" id="commentReply_${replie.id}">
                    <div class="comment__score">
                        <img src="images/icon-plus.svg" alt="">
                        <span>${replie.score}</span>
                        <img src="images/icon-minus.svg" alt="">
                    </div>
            
                    <div class="comment__container">
                        <div class="comment__topline">
                            <div class="comment__info">
                                <img class="comment__info_avatar" src="${replie.user.image.png}"></img>
                                <div class="comment__info_user">${replie.user.username}</div>
                                <div class="comment__info_date">${replie.createdAt}</div>          
                            </div>        
                            <div class="comment__actions">
                                <button id="buttonReply_${replie.id}" class="comment__actions_button purple_font ${replyVisible}" onclick="replyToReply(${replie.id})"><img src="images/icon-reply.svg" alt="">Responder</button>                        
                                <button id="buttonDelete_${replie.id}" class="comment__actions_button red_font trigger ${deleteVisible}" onclick="toggleModal(${replie.id})"><img src="images/icon-delete.svg" alt="">Deletar</button>    
                                <button id="buttonEdit_${replie.id}" class="comment__actions_button purple_font ${editVisible}" onclick="editComment(${replie.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
                            </div>                  
                        </div>  
                        <div class="comment__text">${replie.content}</div>     
                    </div>          
                </div>   

                <div id="replyToReply_${replie.id}" class="comment_reply invisible">
                    <img class="comment__info_avatar" src="${comments.currentUser.image.png}"></img>
                    <textarea class="comment_reply__textarea" placeholder="Adicione um comentário..." form=""></textarea>
                    <button class="comment__send_button">Responder</button>
                </div>
                
                <div class="comment_reply invisible" id="updateComment_${replie.id}">
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
                                <div class="comment__info_date">${replie.createdAt}</div>          
                            </div>    
                            <div class="comment__actions">
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
}

renderComments();

window.addEventListener("click", windowOnClick);       