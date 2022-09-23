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
    let html = '';

    comments.comments.forEach(comment => {
        let htmlSegment = 
            `<div class="comment">
                <div class="comment__interactions">
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
                            <button class="button comment__actions--purple"><img src="images/icon-reply.svg" alt="">Responder</button>                        
                            <button class="button comment__actions--red"><img src="images/icon-delete.svg" alt="">Deletar</button>    
                            <button class="button comment__actions--purple"><img src="images/icon-edit.svg" alt="">Editar</button>            
                        </div>                  
                    </div>  
                    <div class="comment__text">${comment.content}</div>     
                </div>          
            </div>`;              
            
            comment.replies.forEach(replie => {

                let htmlSegment = 
                    `<div class="comment_reply">
                        <div class="comment__interactions">
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
                                    <button class="button comment__actions--purple"><img src="images/icon-reply.svg" alt="">Responder</button>                        
                                    <button class="button comment__actions--red"><img src="images/icon-delete.svg" alt="">Deletar</button>    
                                    <button class="button comment__actions--purple"><img src="images/icon-edit.svg" alt="">Editar</button>            
                                </div>                  
                            </div>  
                            <div class="comment__text">${replie.content}</div>     
                        </div>          
                    </div>`;     
                
                html += htmlSegment;                

            })

        html += htmlSegment;
    });

    let htmlSegment =     
        `<div class="comment comment_send">      
            <img class="comment__info_avatar" src="${comments.currentUser.image.png}"></img>
            <textarea class="comment__textarea" placeholder="Adicione um comentário..." form=""></textarea>
            <button class="comment__sendbutton">Enviar</button>      
        </div>`

    html += htmlSegment;        

    let container = document.querySelector('.comments');
    container.innerHTML = html;
}

renderComments();