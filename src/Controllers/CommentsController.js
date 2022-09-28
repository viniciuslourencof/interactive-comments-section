exports.post = (req, res, next) => {
    res.status(201).send('Rota POST!');
 };
  
 exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send(`Rota PUT com ID! --> ${id}`);
 };
  
 exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota DELETE com ID! --> ${id}`);
 };
  
 exports.get = (req, res, next) => {
    res.status(200).send('Rota GET!');
 };
  
 exports.getById = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Rota GET com ID! ${id}`);
 };


// async function getComments() {
//     let url = 'https://raw.githubusercontent.com/viniciuslourencof/interactive-comments-section/main/data.json';
//     try {
//         let res = await fetch(url);
//         return await res.json();
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function renderComments() {
//     let comments = await getComments();
//     let html = '', currentUsername = comments.currentUser.username, editVisible, replyVisible, deleteVisible, tagVisible;
    

//     comments.comments.forEach(comment => {

//         // verifica se o comentário é do próprio usuário para habilitar/desabilitar botões
//         if (comment.user.username == currentUsername) {
//             editVisible = "";    
//             deleteVisible = "";
//             replyVisible = "invisible";
//             tagVisible = "";
//         } else {
//             editVisible = "invisible";    
//             deleteVisible = "invisible";
//             replyVisible = "";
//             tagVisible = "invisible";
//         }

//         let htmlSegment = 
//             `<div class="comment" id="comment_${comment.id}">
//                 <div class="comment__score">
//                     <img src="images/icon-plus.svg" alt="">
//                     <span>${comment.score}</span>
//                     <img src="images/icon-minus.svg" alt="">
//                 </div>
        
//                 <div class="comment__container">
//                     <div class="comment__topline">
//                         <div class="comment__info">
//                             <img class="comment__info_avatar" src="${comment.user.image.png}"></img>
//                             <div class="comment__info_user">${comment.user.username}</div>
//                             <div class="comment__info_tag ${tagVisible}">você</div>
//                             <div class="comment__info_date">${comment.createdAt}</div>          
//                         </div>        
//                         <div class="comment__actions">
//                             <button id="buttonReply_${comment.id}" class="comment__actions_button purple_font ${replyVisible}" onclick="replyToComment(${comment.id})"><img src="images/icon-reply.svg" alt="">Responder</button>                        
//                             <button id="buttonDelete_${comment.id}" class="comment__actions_button red_font trigger ${deleteVisible}" onclick="toggleModal(${comment.id})"><img src="images/icon-delete.svg" alt="">Deletar</button>    
//                             <button id="buttonEdit_${comment.id}" class="comment__actions_button purple_font ${editVisible}" onclick="editComment(${comment.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
//                         </div>                  
//                     </div>  
//                     <div class="comment__text">${comment.content}</div>     
//                 </div>        
//             </div>
            
//             <div id="replyToComment_${comment.id}" class="comment comment_send invisible">      
//                 <img class="comment__info_avatar" src="${comments.currentUser.image.png}"></img>
//                 <textarea class="comment__textarea" placeholder="Adicione um comentário..." form=""></textarea>
//                 <button class="comment__send_button">Responder</button>      
//             </div>            

//             <div class="comment invisible" id="updateComment_${comment.id}">
//                 <div class="comment__score">
//                     <img src="images/icon-plus.svg" alt="">
//                     <span>${comment.score}</span>
//                     <img src="images/icon-minus.svg" alt="">
//                 </div>
        
//                 <div class="comment__container">
//                     <div class="comment__topline">
//                         <div class="comment__info">
//                             <img class="comment__info_avatar" src="${comment.user.image.png}"></img>
//                             <div class="comment__info_user">${comment.user.username}</div>
//                             <div class="comment__info_tag">você</div>
//                             <div class="comment__info_date">${comment.createdAt}</div>          
//                         </div>        
//                         <div class="comment__actions">
//                             <button id="buttonEdit_${comment.id}" class="comment__actions_button purple_font ${editVisible} disabled" onclick="editComment(${comment.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
//                         </div>                                                                                  
//                     </div>  
//                     <textarea class="comment__textarea" form="">${comment.content}</textarea> 
//                     <button class="comment__send_button">Atualizar</button>                                   
//                 </div>        
//             </div>`;   
            
//         html += htmlSegment;               
            
//         comment.replies.forEach(replie => {

//             // verifica se o comentário é do próprio usuário para habilitar/desabilitar botões
//             if (replie.user.username == currentUsername) {
//                 editVisible = "";    
//                 deleteVisible = "";
//                 replyVisible = "invisible";
//                 tagVisible = "";
//             } else {
//                 editVisible = "invisible";    
//                 deleteVisible = "invisible";
//                 replyVisible = "";
//                 tagVisible = "invisible";                
//             }            

//             let htmlSegment = 
//                 `<div class="comment_reply" id="commentReply_${replie.id}">
//                     <div class="comment__score">
//                         <img src="images/icon-plus.svg" alt="">
//                         <span>${replie.score}</span>
//                         <img src="images/icon-minus.svg" alt="">
//                     </div>
            
//                     <div class="comment__container">
//                         <div class="comment__topline">
//                             <div class="comment__info">
//                                 <img class="comment__info_avatar" src="${replie.user.image.png}"></img>
//                                 <div class="comment__info_user">${replie.user.username}</div>
//                                 <div class="comment__info_tag ${tagVisible}">você</div>
//                                 <div class="comment__info_date">${replie.createdAt}</div>          
//                             </div>        
//                             <div class="comment__actions">
//                                 <button id="buttonReply_${replie.id}" class="comment__actions_button purple_font ${replyVisible}" onclick="replyToReply(${replie.id})"><img src="images/icon-reply.svg" alt="">Responder</button>                        
//                                 <button id="buttonDelete_${replie.id}" class="comment__actions_button red_font trigger ${deleteVisible}" onclick="toggleModal(${replie.id})"><img src="images/icon-delete.svg" alt="">Deletar</button>    
//                                 <button id="buttonEdit_${replie.id}" class="comment__actions_button purple_font ${editVisible}" onclick="editComment(${replie.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
//                             </div>                  
//                         </div>  
//                         <div class="comment__text">${replie.content}</div>     
//                     </div>          
//                 </div>   

//                 <div id="replyToReply_${replie.id}" class="comment_reply invisible">
//                     <img class="comment__info_avatar" src="${comments.currentUser.image.png}"></img>
//                     <textarea class="comment_reply__textarea" placeholder="Adicione um comentário..." form=""></textarea>
//                     <button class="comment__send_button">Responder</button>
//                 </div>
                
//                 <div class="comment_reply invisible" id="updateComment_${replie.id}">
//                     <div class="comment__score">
//                         <img src="images/icon-plus.svg" alt="">
//                         <span>${replie.score}</span>
//                         <img src="images/icon-minus.svg" alt="">
//                     </div>
                    
//                     <div class="comment_update__container">                                                             
//                         <div class="comment__topline">
//                             <div class="comment__info">
//                                 <img class="comment__info_avatar" src="${replie.user.image.png}"></img>
//                                 <div class="comment__info_user">${replie.user.username}</div>
//                                 <div class="comment__info_tag">você</div>
//                                 <div class="comment__info_date">${replie.createdAt}</div>          
//                             </div>    
//                             <div class="comment__actions">
//                                 <button id="buttonEdit_${replie.id}" class="comment__actions_button purple_font ${editVisible} disabled" onclick="editComment(${replie.id})"><img src="images/icon-edit.svg" alt="">Editar</button>            
//                             </div>                                                                   
//                         </div>         
                        
//                         <div class="comment__bottomline">
//                             <textarea class="comment_reply__textarea" form="">${replie.content}</textarea>
//                             <button class="comment__send_button">Atualizar</button>                                   
//                         </div>         
//                     </div>                                                                               
//                 </div>`                               
            
//             html += htmlSegment;                

//         })
//     });

//     htmlSegment =     
//         `<div class="comment comment_send">      
//             <img class="comment__info_avatar" src="${comments.currentUser.image.png}"></img>
//             <textarea class="comment__textarea" placeholder="Adicione um comentário..." form=""></textarea>
//             <button class="comment__send_button">Enviar</button>      
//         </div>`

//     html += htmlSegment;        

//     let container = document.querySelector('.comments');
//     container.innerHTML = html;    
// }

// renderComments();
