(function(){var G=YAHOO.util.Dom,M=YAHOO.util.Event,I=YAHOO.lang,L=YAHOO.env.ua,B=YAHOO.widget.Overlay,J=YAHOO.widget.Menu,D={},K=null,E=null,C=null;function F(O,N,R,P){var S,Q;if(I.isString(O)&&I.isString(N)){if(L.ie){Q='<input type="'+O+'" name="'+N+'"';if(P){Q+=" checked";}Q+=">";S=document.createElement(Q);}else{S=document.createElement("input");S.name=N;S.type=O;if(P){S.checked=true;}}S.value=R;}return S;}function H(O,U){var N=O.nodeName.toUpperCase(),S=this,T,P,Q;function V(W){if(!(W in U)){T=O.getAttributeNode(W);if(T&&("value" in T)){U[W]=T.value;}}}function R(){V("type");if(U.type=="button"){U.type="push";}if(!("disabled" in U)){U.disabled=O.disabled;}V("name");V("value");V("title");}switch(N){case"A":U.type="link";V("href");V("target");break;case"INPUT":R();if(!("checked" in U)){U.checked=O.checked;}break;case"BUTTON":R();P=O.parentNode.parentNode;if(G.hasClass(P,this.CSS_CLASS_NAME+"-checked")){U.checked=true;}if(G.hasClass(P,this.CSS_CLASS_NAME+"-disabled")){U.disabled=true;}O.removeAttribute("value");O.setAttribute("type","button");break;}O.removeAttribute("id");O.removeAttribute("name");if(!("tabindex" in U)){U.tabindex=O.tabIndex;}if(!("label" in U)){Q=N=="INPUT"?O.value:O.innerHTML;if(Q&&Q.length>0){U.label=Q;}}}function A(P){var O=P.attributes,N=O.srcelement,R=N.nodeName.toUpperCase(),Q=this;if(R==this.NODE_NAME){P.element=N;P.id=N.id;G.getElementsBy(function(S){switch(S.nodeName.toUpperCase()){case"BUTTON":case"A":case"INPUT":H.call(Q,S,O);break;}},"*",N);}else{switch(R){case"BUTTON":case"A":case"INPUT":H.call(this,N,O);break;}}}YAHOO.widget.Button=function(R,O){if(!B&&YAHOO.widget.Overlay){B=YAHOO.widget.Overlay;}if(!J&&YAHOO.widget.Menu){J=YAHOO.widget.Menu;}var Q=YAHOO.widget.Button.superclass.constructor,P,N;if(arguments.length==1&&!I.isString(R)&&!R.nodeName){if(!R.id){R.id=G.generateId();}Q.call(this,(this.createButtonElement(R.type)),R);}else{P={element:null,attributes:(O||{})};if(I.isString(R)){N=G.get(R);if(N){if(!P.attributes.id){P.attributes.id=R;}P.attributes.srcelement=N;A.call(this,P);if(!P.element){P.element=this.createButtonElement(P.attributes.type);}Q.call(this,P.element,P.attributes);}}else{if(R.nodeName){if(!P.attributes.id){if(R.id){P.attributes.id=R.id;}else{P.attributes.id=G.generateId();}}P.attributes.srcelement=R;A.call(this,P);if(!P.element){P.element=this.createButtonElement(P.attributes.type);}Q.call(this,P.element,P.attributes);}}}};YAHOO.extend(YAHOO.widget.Button,YAHOO.util.Element,{_button:null,_menu:null,_hiddenFields:null,_onclickAttributeValue:null,_activationKeyPressed:false,_activationButtonPressed:false,_hasKeyEventHandlers:false,_hasMouseEventHandlers:false,_nOptionRegionX:0,NODE_NAME:"SPAN",CHECK_ACTIVATION_KEYS:[32],ACTIVATION_KEYS:[13,32],OPTION_AREA_WIDTH:20,CSS_CLASS_NAME:"yui-button",RADIO_DEFAULT_TITLE:"Unchecked.  Click to check.",RADIO_CHECKED_TITLE:"Checked.  Click another button to uncheck",CHECKBOX_DEFAULT_TITLE:"Unchecked.  Click to check.",CHECKBOX_CHECKED_TITLE:"Checked.  Click to uncheck.",MENUBUTTON_DEFAULT_TITLE:"Menu collapsed.  Click to expand.",MENUBUTTON_MENU_VISIBLE_TITLE:"Menu expanded.  Click or press Esc to collapse.",SPLITBUTTON_DEFAULT_TITLE:("Menu collapsed.  Click inside option "+"region or press down arrow key to show the menu."),SPLITBUTTON_OPTION_VISIBLE_TITLE:"Menu expanded.  Press Esc to hide the menu.",SUBMIT_TITLE:"Click to submit form.",_setType:function(N){if(N=="split"){this.on("option",this._onOption);}},_setLabel:function(O){this._button.innerHTML=O;var P,N=L.gecko;if(N&&N<1.9&&G.inDocument(this.get("element"))){P=this.CSS_CLASS_NAME;this.removeClass(P);I.later(0,this,this.addClass,P);}},_setTabIndex:function(N){this._button.tabIndex=N;},_setTitle:function(O){var N=O;if(this.get("type")!="link"){if(!N){switch(this.get("type")){case"radio":N=this.RADIO_DEFAULT_TITLE;break;case"checkbox":N=this.CHECKBOX_DEFAULT_TITLE;break;case"menu":N=this.MENUBUTTON_DEFAULT_TITLE;break;case"split":N=this.SPLITBUTTON_DEFAULT_TITLE;break;case"submit":N=this.SUBMIT_TITLE;break;}}this._button.title=N;}},_setDisabled:function(N){if(this.get("type")!="link"){if(N){if(this._menu){this._menu.hide();}if(this.hasFocus()){this.blur();}this._button.setAttribute("disabled","disabled");this.addStateCSSClasses("disabled");this.removeStateCSSClasses("hover");this.removeStateCSSClasses("active");this.removeStateCSSClasses("focus");}else{this._button.removeAttribute("disabled");this.removeStateCSSClasses("disabled");}}},_setHref:function(N){if(this.get("type")=="link"){this._button.href=N;}},_setTarget:function(N){if(this.get("type")=="link"){this._button.setAttribute("target",N);}},_setChecked:function(O){var P=this.get("type"),N;if(P=="checkbox"||P=="radio"){if(O){this.addStateCSSClasses("checked");N=(P=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}else{this.removeStateCSSClasses("checked");N=(P=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}if(!this._hasDefaultTitle){this.set("title",N);}}},_setMenu:function(Y){var R=this.get("lazyloadmenu"),U=this.get("element"),N,a=false,b,Q,T,P,O,X,S;function Z(){b.render(U.parentNode);this.removeListener("appendTo",Z);}function W(){b.cfg.queueProperty("container",U.parentNode);this.removeListener("appendTo",W);}function V(){var c;if(b){G.addClass(b.element,this.get("menuclassname"));G.addClass(b.element,"yui-"+this.get("type")+"-button-menu");b.showEvent.subscribe(this._onMenuShow,null,this);b.hideEvent.subscribe(this._onMenuHide,null,this);b.renderEvent.subscribe(this._onMenuRender,null,this);if(J&&b instanceof J){if(R){c=this.get("container");if(c){b.cfg.queueProperty("container",c);}else{this.on("appendTo",W);}}b.cfg.queueProperty("minscrollheight",this.get("menuminscrollheight"));b.cfg.queueProperty("clicktohide",false);b.keyDownEvent.subscribe(this._onMenuKeyDown,this,true);b.subscribe("click",this._onMenuClick,this,true);b.itemAddedEvent.subscribe(this._onMenuItemAdded,this,true);T=b.srcElement;if(T&&T.nodeName.toUpperCase()=="SELECT"){T.style.display="none";
T.parentNode.removeChild(T);}}else{if(B&&b instanceof B){if(!K){K=new YAHOO.widget.OverlayManager();}K.register(b);}}this._menu=b;if(!a){if(R&&J&&!(b instanceof J)){b.beforeShowEvent.subscribe(this._onOverlayBeforeShow,null,this);}else{if(!R){if(G.inDocument(U)){b.render(U.parentNode);}else{this.on("appendTo",Z);}}}}}}if(B){if(J){N=J.prototype.CSS_CLASS_NAME;}if(Y&&J&&(Y instanceof J)){b=Y;P=b.getItems();O=P.length;a=true;if(O>0){S=O-1;do{X=P[S];if(X){X.cfg.subscribeToConfigEvent("selected",this._onMenuItemSelected,X,this);}}while(S--);}V.call(this);}else{if(B&&Y&&(Y instanceof B)){b=Y;a=true;b.cfg.queueProperty("visible",false);V.call(this);}else{if(J&&I.isArray(Y)){b=new J(G.generateId(),{lazyload:R,itemdata:Y});this._menu=b;this.on("appendTo",V);}else{if(I.isString(Y)){Q=G.get(Y);if(Q){if(J&&G.hasClass(Q,N)||Q.nodeName.toUpperCase()=="SELECT"){b=new J(Y,{lazyload:R});V.call(this);}else{if(B){b=new B(Y,{visible:false});V.call(this);}}}}else{if(Y&&Y.nodeName){if(J&&G.hasClass(Y,N)||Y.nodeName.toUpperCase()=="SELECT"){b=new J(Y,{lazyload:R});V.call(this);}else{if(B){if(!Y.id){G.generateId(Y);}b=new B(Y,{visible:false});V.call(this);}}}}}}}}},_setOnClick:function(N){if(this._onclickAttributeValue&&(this._onclickAttributeValue!=N)){this.removeListener("click",this._onclickAttributeValue.fn);this._onclickAttributeValue=null;}if(!this._onclickAttributeValue&&I.isObject(N)&&I.isFunction(N.fn)){this.on("click",N.fn,N.obj,N.scope);this._onclickAttributeValue=N;}},_setSelectedMenuItem:function(O){var N=this._menu,P;if(J&&N&&N instanceof J){P=N.getItem(O);if(P&&!P.cfg.getProperty("selected")){P.cfg.setProperty("selected",true);}}},_isActivationKey:function(N){var S=this.get("type"),O=(S=="checkbox"||S=="radio")?this.CHECK_ACTIVATION_KEYS:this.ACTIVATION_KEYS,Q=O.length,R=false,P;if(Q>0){P=Q-1;do{if(N==O[P]){R=true;break;}}while(P--);}return R;},_isSplitButtonOptionKey:function(P){var O=(M.getCharCode(P)==40);var N=function(Q){M.preventDefault(Q);this.removeListener("keypress",N);};if(O){if(L.opera){this.on("keypress",N);}M.preventDefault(P);}return O;},_addListenersToForm:function(){var T=this.getForm(),S=YAHOO.widget.Button.onFormKeyPress,R,N,Q,P,O;if(T){M.on(T,"reset",this._onFormReset,null,this);M.on(T,"submit",this._onFormSubmit,null,this);N=this.get("srcelement");if(this.get("type")=="submit"||(N&&N.type=="submit")){Q=M.getListeners(T,"keypress");R=false;if(Q){P=Q.length;if(P>0){O=P-1;do{if(Q[O].fn==S){R=true;break;}}while(O--);}}if(!R){M.on(T,"keypress",S);}}}},_showMenu:function(S){if(YAHOO.widget.MenuManager){YAHOO.widget.MenuManager.hideVisible();}if(K){K.hideAll();}var N=this._menu,Q=this.get("menualignment"),R=this.get("menumaxheight"),O=this.get("focusmenu"),U={"trbr":true,"tlbl":true,"bltl":true,"brtr":true},P=(Q&&U[Q[0]+Q[1]]);N.cfg.setProperty("context",[this.get("element"),Q[0],Q[1]]);N.cfg.setProperty("preventcontextoverlap",true);N.cfg.setProperty("constraintoviewport",true);var T=function(e){var a=N.element,o=a.offsetHeight,m=YAHOO.widget.Overlay.VIEWPORT_OFFSET,i=G.getViewportHeight(),l=G.getDocumentScrollTop(),j=(o+m<i),k=N.cfg.getProperty("context"),b,f,g,d=false,c,W,h,Y,V=e;if(!j){O=false;}var Z=function(){var p;if((N.cfg.getProperty("y")-l)>f){p=(f-o);}else{p=(f+g);}N.cfg.setProperty("y",(p+l),true);return p;};var X=function(){if((N.cfg.getProperty("y")-l)>f){return(W-m);}else{return(c-m);}};var n=function(){var t=X(),p=(N.getItems().length>0),s,r,q;if(o>t){s=p?N.cfg.getProperty("minscrollheight"):o;if(t>s){if(p){N.cfg.setProperty("maxheight",t);if((N.cfg.getProperty("y")-l)>f){q=(f+g);}else{q=(f-a.offsetHeight);}N.cfg.setProperty("y",(q+l),true);}}else{N.cfg.setProperty("maxheight",R);}if(t<s){if(d){Z();}else{Z();d=true;r=n();}}}else{N.cfg.setProperty("maxheight",R);}return r;};if(P){if(j){b=k[0];g=b.offsetHeight;f=(G.getY(b)-l);c=f;W=(i-(f+g));n();}V=N.cfg.getProperty("y");}else{if(j){h=l+m;Y=l+i-o-m;if(e<h){V=h;}else{if(e>Y){V=Y;}}}else{V=m+l;}}return V;};if(J&&N&&(N instanceof J)){N.show();if(!(R===0&&!P)){N.cfg.setProperty("maxheight",R);if(P&&!this.setup){N.getConstrainedY=T;}}N.align();if(S.type=="mousedown"){M.stopPropagation(S);}if(O){N.focus();}}else{if(B&&N&&(N instanceof B)){N.show();N.align();}}},_hideMenu:function(){var N=this._menu;if(N){N.hide();}},_onMouseOver:function(O){var Q=this.get("type"),N,P;if(Q==="split"){N=this.get("element");P=(G.getX(N)+(N.offsetWidth-this.OPTION_AREA_WIDTH));this._nOptionRegionX=P;}if(!this._hasMouseEventHandlers){if(Q==="split"){this.on("mousemove",this._onMouseMove);}this.on("mouseout",this._onMouseOut);this._hasMouseEventHandlers=true;}this.addStateCSSClasses("hover");if(Q==="split"&&(M.getPageX(O)>P)){this.addStateCSSClasses("hoveroption");}if(this._activationButtonPressed){this.addStateCSSClasses("active");}if(this._bOptionPressed){this.addStateCSSClasses("activeoption");}if(this._activationButtonPressed||this._bOptionPressed){M.removeListener(document,"mouseup",this._onDocumentMouseUp);}},_onMouseMove:function(N){var O=this._nOptionRegionX;if(O){if(M.getPageX(N)>O){this.addStateCSSClasses("hoveroption");}else{this.removeStateCSSClasses("hoveroption");}}},_onMouseOut:function(N){var O=this.get("type");this.removeStateCSSClasses("hover");if(O!="menu"){this.removeStateCSSClasses("active");}if(this._activationButtonPressed||this._bOptionPressed){M.on(document,"mouseup",this._onDocumentMouseUp,null,this);}if(O==="split"&&(M.getPageX(N)>this._nOptionRegionX)){this.removeStateCSSClasses("hoveroption");}},_onDocumentMouseUp:function(P){this._activationButtonPressed=false;this._bOptionPressed=false;var Q=this.get("type"),N,O;if(Q=="menu"||Q=="split"){N=M.getTarget(P);O=this._menu.element;if(N!=O&&!G.isAncestor(O,N)){this.removeStateCSSClasses((Q=="menu"?"active":"activeoption"));this._hideMenu();}}M.removeListener(document,"mouseup",this._onDocumentMouseUp);},_onMouseDown:function(P){var Q,O=true;function N(){this._hideMenu();this.removeListener("mouseup",N);}if((P.which||P.button)==1){if(!this.hasFocus()){this.focus();}Q=this.get("type");
if(Q=="split"){if(M.getPageX(P)>this._nOptionRegionX){this.fireEvent("option",P);O=false;}else{this.addStateCSSClasses("active");this._activationButtonPressed=true;}}else{if(Q=="menu"){if(this.isActive()){this._hideMenu();this._activationButtonPressed=false;}else{this._showMenu(P);this._activationButtonPressed=true;}}else{this.addStateCSSClasses("active");this._activationButtonPressed=true;}}if(Q=="split"||Q=="menu"){this._hideMenuTimer=I.later(250,this,this.on,["mouseup",N]);}}return O;},_onMouseUp:function(P){var Q=this.get("type"),N=this._hideMenuTimer,O=true;if(N){N.cancel();}if(Q=="checkbox"||Q=="radio"){this.set("checked",!(this.get("checked")));}this._activationButtonPressed=false;if(Q!="menu"){this.removeStateCSSClasses("active");}if(Q=="split"&&M.getPageX(P)>this._nOptionRegionX){O=false;}return O;},_onFocus:function(O){var N;this.addStateCSSClasses("focus");if(this._activationKeyPressed){this.addStateCSSClasses("active");}C=this;if(!this._hasKeyEventHandlers){N=this._button;M.on(N,"blur",this._onBlur,null,this);M.on(N,"keydown",this._onKeyDown,null,this);M.on(N,"keyup",this._onKeyUp,null,this);this._hasKeyEventHandlers=true;}this.fireEvent("focus",O);},_onBlur:function(N){this.removeStateCSSClasses("focus");if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}if(this._activationKeyPressed){M.on(document,"keyup",this._onDocumentKeyUp,null,this);}C=null;this.fireEvent("blur",N);},_onDocumentKeyUp:function(N){if(this._isActivationKey(M.getCharCode(N))){this._activationKeyPressed=false;M.removeListener(document,"keyup",this._onDocumentKeyUp);}},_onKeyDown:function(O){var N=this._menu;if(this.get("type")=="split"&&this._isSplitButtonOptionKey(O)){this.fireEvent("option",O);}else{if(this._isActivationKey(M.getCharCode(O))){if(this.get("type")=="menu"){this._showMenu(O);}else{this._activationKeyPressed=true;this.addStateCSSClasses("active");}}}if(N&&N.cfg.getProperty("visible")&&M.getCharCode(O)==27){N.hide();this.focus();}},_onKeyUp:function(N){var O;if(this._isActivationKey(M.getCharCode(N))){O=this.get("type");if(O=="checkbox"||O=="radio"){this.set("checked",!(this.get("checked")));}this._activationKeyPressed=false;if(this.get("type")!="menu"){this.removeStateCSSClasses("active");}}},_onClick:function(Q){var S=this.get("type"),N,R,O,P;switch(S){case"radio":case"checkbox":if(!this._hasDefaultTitle){if(this.get("checked")){N=(S=="radio")?this.RADIO_CHECKED_TITLE:this.CHECKBOX_CHECKED_TITLE;}else{N=(S=="radio")?this.RADIO_DEFAULT_TITLE:this.CHECKBOX_DEFAULT_TITLE;}this.set("title",N);}break;case"submit":if(Q.returnValue!==false){this.submitForm();}break;case"reset":R=this.getForm();if(R){R.reset();}break;case"menu":N=this._menu.cfg.getProperty("visible")?this.MENUBUTTON_MENU_VISIBLE_TITLE:this.MENUBUTTON_DEFAULT_TITLE;this.set("title",N);break;case"split":if(M.getPageX(Q)>this._nOptionRegionX){P=false;}else{this._hideMenu();O=this.get("srcelement");if(O&&O.type=="submit"){this.submitForm();}}N=this._menu.cfg.getProperty("visible")?this.SPLITBUTTON_OPTION_VISIBLE_TITLE:this.SPLITBUTTON_DEFAULT_TITLE;this.set("title",N);break;}return P;},_onDblClick:function(O){var N=true;if(this.get("type")=="split"&&M.getPageX(O)>this._nOptionRegionX){N=false;}return N;},_onAppendTo:function(N){I.later(0,this,this._addListenersToForm);},_onFormReset:function(O){var P=this.get("type"),N=this._menu;if(P=="checkbox"||P=="radio"){this.resetValue("checked");}if(J&&N&&(N instanceof J)){this.resetValue("selectedMenuItem");}},_onFormSubmit:function(N){this.createHiddenFields();},_onDocumentMouseDown:function(Q){var N=M.getTarget(Q),P=this.get("element"),O=this._menu.element;if(N!=P&&!G.isAncestor(P,N)&&N!=O&&!G.isAncestor(O,N)){this._hideMenu();M.removeListener(document,"mousedown",this._onDocumentMouseDown);}},_onOption:function(N){if(this.hasClass("yui-split-button-activeoption")){this._hideMenu();this._bOptionPressed=false;}else{this._showMenu(N);this._bOptionPressed=true;}},_onOverlayBeforeShow:function(O){var N=this._menu;N.render(this.get("element").parentNode);N.beforeShowEvent.unsubscribe(this._onOverlayBeforeShow);},_onMenuShow:function(O){M.on(document,"mousedown",this._onDocumentMouseDown,null,this);var N,P;if(this.get("type")=="split"){N=this.SPLITBUTTON_OPTION_VISIBLE_TITLE;P="activeoption";}else{N=this.MENUBUTTON_MENU_VISIBLE_TITLE;P="active";}this.addStateCSSClasses(P);this.set("title",N);},_onMenuHide:function(P){var O=this._menu,N,Q;if(this.get("type")=="split"){N=this.SPLITBUTTON_DEFAULT_TITLE;Q="activeoption";}else{N=this.MENUBUTTON_DEFAULT_TITLE;Q="active";}this.removeStateCSSClasses(Q);this.set("title",N);if(this.get("type")=="split"){this._bOptionPressed=false;}},_onMenuKeyDown:function(P,O){var N=O[0];if(M.getCharCode(N)==27){this.focus();if(this.get("type")=="split"){this._bOptionPressed=false;}}},_onMenuRender:function(O){var Q=this.get("element"),N=Q.parentNode,P=this._menu.element;if(N!=P.parentNode){N.appendChild(P);}this.set("selectedMenuItem",this.get("selectedMenuItem"));},_onMenuItemSelected:function(P,O,N){var Q=O[0];if(Q){this.set("selectedMenuItem",N);}},_onMenuItemAdded:function(P,O,N){var Q=O[0];Q.cfg.subscribeToConfigEvent("selected",this._onMenuItemSelected,Q,this);},_onMenuClick:function(O,N){var Q=N[1],P;if(Q){this.set("selectedMenuItem",Q);P=this.get("srcelement");if(P&&P.type=="submit"){this.submitForm();}this._hideMenu();}},createButtonElement:function(N){var P=this.NODE_NAME,O=document.createElement(P);O.innerHTML="<"+P+' class="first-child">'+(N=="link"?"<a></a>":'<button type="button"></button>')+"</"+P+">";return O;},addStateCSSClasses:function(N){var O=this.get("type");if(I.isString(N)){if(N!="activeoption"&&N!="hoveroption"){this.addClass(this.CSS_CLASS_NAME+("-"+N));}this.addClass("yui-"+O+("-button-"+N));}},removeStateCSSClasses:function(N){var O=this.get("type");if(I.isString(N)){this.removeClass(this.CSS_CLASS_NAME+("-"+N));this.removeClass("yui-"+O+("-button-"+N));}},createHiddenFields:function(){this.removeHiddenFields();var V=this.getForm(),Z,O,S,X,Y,T,U,N,R,W,P,Q=false;
if(V&&!this.get("disabled")){O=this.get("type");S=(O=="checkbox"||O=="radio");if((S&&this.get("checked"))||(E==this)){Z=F((S?O:"hidden"),this.get("name"),this.get("value"),this.get("checked"));if(Z){if(S){Z.style.display="none";}V.appendChild(Z);}}X=this._menu;if(J&&X&&(X instanceof J)){Y=this.get("selectedMenuItem");P=X.srcElement;Q=(P&&P.nodeName.toUpperCase()=="SELECT");if(Y){U=(Y.value===null||Y.value==="")?Y.cfg.getProperty("text"):Y.value;T=this.get("name");if(Q){W=P.name;}else{if(T){W=(T+"_options");}}if(U&&W){N=F("hidden",W,U);V.appendChild(N);}}else{if(Q){V.appendChild(P);}}}if(Z&&N){this._hiddenFields=[Z,N];}else{if(!Z&&N){this._hiddenFields=N;}else{if(Z&&!N){this._hiddenFields=Z;}}}R=this._hiddenFields;}return R;},removeHiddenFields:function(){var Q=this._hiddenFields,O,P;function N(R){if(G.inDocument(R)){R.parentNode.removeChild(R);}}if(Q){if(I.isArray(Q)){O=Q.length;if(O>0){P=O-1;do{N(Q[P]);}while(P--);}}else{N(Q);}this._hiddenFields=null;}},submitForm:function(){var Q=this.getForm(),P=this.get("srcelement"),O=false,N;if(Q){if(this.get("type")=="submit"||(P&&P.type=="submit")){E=this;}if(L.ie){O=Q.fireEvent("onsubmit");}else{N=document.createEvent("HTMLEvents");N.initEvent("submit",true,true);O=Q.dispatchEvent(N);}if((L.ie||L.webkit)&&O){Q.submit();}}return O;},init:function(O,Z){var Q=Z.type=="link"?"a":"button",V=Z.srcelement,Y=O.getElementsByTagName(Q)[0],X;if(!Y){X=O.getElementsByTagName("input")[0];if(X){Y=document.createElement("button");Y.setAttribute("type","button");X.parentNode.replaceChild(Y,X);}}this._button=Y;this._hasDefaultTitle=(Z.title&&Z.title.length>0);YAHOO.widget.Button.superclass.init.call(this,O,Z);var T=this.get("id"),N=T+"-button";Y.id=N;var U,W;var c=function(d){return(d.htmlFor===T);};var S=function(){W.setAttribute((L.ie?"htmlFor":"for"),N);};if(V&&this.get("type")!="link"){U=G.getElementsBy(c,"label");if(I.isArray(U)&&U.length>0){W=U[0];}}D[T]=this;this.addClass(this.CSS_CLASS_NAME);this.addClass("yui-"+this.get("type")+"-button");M.on(this._button,"focus",this._onFocus,null,this);this.on("mouseover",this._onMouseOver);this.on("mousedown",this._onMouseDown);this.on("mouseup",this._onMouseUp);this.on("click",this._onClick);this.on("dblclick",this._onDblClick);if(W){this.on("appendTo",S);}this.on("appendTo",this._onAppendTo);var b=this.get("container"),P=this.get("element"),a=G.inDocument(P),R;if(b){if(V&&V!=P){R=V.parentNode;if(R){R.removeChild(V);}}if(I.isString(b)){M.onContentReady(b,this.appendTo,b,this);}else{this.on("init",function(){I.later(0,this,this.appendTo,b);});}}else{if(!a&&V&&V!=P){R=V.parentNode;if(R){this.fireEvent("beforeAppendTo",{type:"beforeAppendTo",target:R});R.replaceChild(P,V);this.fireEvent("appendTo",{type:"appendTo",target:R});}}else{if(this.get("type")!="link"&&a&&V&&V==P){this._addListenersToForm();}}}this.fireEvent("init",{type:"init",target:this});},initAttributes:function(O){var N=O||{};YAHOO.widget.Button.superclass.initAttributes.call(this,N);this.setAttributeConfig("type",{value:(N.type||"push"),validator:I.isString,writeOnce:true,method:this._setType});this.setAttributeConfig("label",{value:N.label,validator:I.isString,method:this._setLabel});this.setAttributeConfig("value",{value:N.value});this.setAttributeConfig("name",{value:N.name,validator:I.isString});this.setAttributeConfig("tabindex",{value:N.tabindex,validator:I.isNumber,method:this._setTabIndex});this.configureAttribute("title",{value:N.title,validator:I.isString,method:this._setTitle});this.setAttributeConfig("disabled",{value:(N.disabled||false),validator:I.isBoolean,method:this._setDisabled});this.setAttributeConfig("href",{value:N.href,validator:I.isString,method:this._setHref});this.setAttributeConfig("target",{value:N.target,validator:I.isString,method:this._setTarget});this.setAttributeConfig("checked",{value:(N.checked||false),validator:I.isBoolean,method:this._setChecked});this.setAttributeConfig("container",{value:N.container,writeOnce:true});this.setAttributeConfig("srcelement",{value:N.srcelement,writeOnce:true});this.setAttributeConfig("menu",{value:null,method:this._setMenu,writeOnce:true});this.setAttributeConfig("lazyloadmenu",{value:(N.lazyloadmenu===false?false:true),validator:I.isBoolean,writeOnce:true});this.setAttributeConfig("menuclassname",{value:(N.menuclassname||"yui-button-menu"),validator:I.isString,method:this._setMenuClassName,writeOnce:true});this.setAttributeConfig("menuminscrollheight",{value:(N.menuminscrollheight||90),validator:I.isNumber});this.setAttributeConfig("menumaxheight",{value:(N.menumaxheight||0),validator:I.isNumber});this.setAttributeConfig("menualignment",{value:(N.menualignment||["tl","bl"]),validator:I.isArray});this.setAttributeConfig("selectedMenuItem",{value:null,method:this._setSelectedMenuItem});this.setAttributeConfig("onclick",{value:N.onclick,method:this._setOnClick});this.setAttributeConfig("focusmenu",{value:(N.focusmenu===false?false:true),validator:I.isBoolean});},focus:function(){if(!this.get("disabled")){this._button.focus();}},blur:function(){if(!this.get("disabled")){this._button.blur();}},hasFocus:function(){return(C==this);},isActive:function(){return this.hasClass(this.CSS_CLASS_NAME+"-active");},getMenu:function(){return this._menu;},getForm:function(){var N=this._button,O;if(N){O=N.form;}return O;},getHiddenFields:function(){return this._hiddenFields;},destroy:function(){var P=this.get("element"),O=P.parentNode,N=this._menu,R;if(N){if(K&&K.find(N)){K.remove(N);}N.destroy();}M.purgeElement(P);M.purgeElement(this._button);M.removeListener(document,"mouseup",this._onDocumentMouseUp);M.removeListener(document,"keyup",this._onDocumentKeyUp);M.removeListener(document,"mousedown",this._onDocumentMouseDown);var Q=this.getForm();if(Q){M.removeListener(Q,"reset",this._onFormReset);M.removeListener(Q,"submit",this._onFormSubmit);}this.unsubscribeAll();if(O){O.removeChild(P);}delete D[this.get("id")];R=G.getElementsByClassName(this.CSS_CLASS_NAME,this.NODE_NAME,Q);if(I.isArray(R)&&R.length===0){M.removeListener(Q,"keypress",YAHOO.widget.Button.onFormKeyPress);
}},fireEvent:function(O,N){var P=arguments[0];if(this.DOM_EVENTS[P]&&this.get("disabled")){return false;}return YAHOO.widget.Button.superclass.fireEvent.apply(this,arguments);},toString:function(){return("Button "+this.get("id"));}});YAHOO.widget.Button.onFormKeyPress=function(R){var P=M.getTarget(R),S=M.getCharCode(R),Q=P.nodeName&&P.nodeName.toUpperCase(),N=P.type,T=false,V,X,O,W;function U(a){var Z,Y;switch(a.nodeName.toUpperCase()){case"INPUT":case"BUTTON":if(a.type=="submit"&&!a.disabled){if(!T&&!O){O=a;}}break;default:Z=a.id;if(Z){V=D[Z];if(V){T=true;if(!V.get("disabled")){Y=V.get("srcelement");if(!X&&(V.get("type")=="submit"||(Y&&Y.type=="submit"))){X=V;}}}}break;}}if(S==13&&((Q=="INPUT"&&(N=="text"||N=="password"||N=="checkbox"||N=="radio"||N=="file"))||Q=="SELECT")){G.getElementsBy(U,"*",this);if(O){O.focus();}else{if(!O&&X){M.preventDefault(R);if(L.ie){X.get("element").fireEvent("onclick");}else{W=document.createEvent("HTMLEvents");W.initEvent("click",true,true);if(L.gecko<1.9){X.fireEvent("click",W);}else{X.get("element").dispatchEvent(W);}}}}}};YAHOO.widget.Button.addHiddenFieldsToForm=function(N){var S=G.getElementsByClassName(YAHOO.widget.Button.prototype.CSS_CLASS_NAME,"*",N),Q=S.length,R,O,P;if(Q>0){for(P=0;P<Q;P++){O=S[P].id;if(O){R=D[O];if(R){R.createHiddenFields();}}}}};YAHOO.widget.Button.getButton=function(N){return D[N];};})();(function(){var C=YAHOO.util.Dom,B=YAHOO.util.Event,D=YAHOO.lang,A=YAHOO.widget.Button,E={};YAHOO.widget.ButtonGroup=function(J,H){var I=YAHOO.widget.ButtonGroup.superclass.constructor,K,G,F;if(arguments.length==1&&!D.isString(J)&&!J.nodeName){if(!J.id){F=C.generateId();J.id=F;}I.call(this,(this._createGroupElement()),J);}else{if(D.isString(J)){G=C.get(J);if(G){if(G.nodeName.toUpperCase()==this.NODE_NAME){I.call(this,G,H);}}}else{K=J.nodeName.toUpperCase();if(K&&K==this.NODE_NAME){if(!J.id){J.id=C.generateId();}I.call(this,J,H);}}}};YAHOO.extend(YAHOO.widget.ButtonGroup,YAHOO.util.Element,{_buttons:null,NODE_NAME:"DIV",CSS_CLASS_NAME:"yui-buttongroup",_createGroupElement:function(){var F=document.createElement(this.NODE_NAME);return F;},_setDisabled:function(G){var H=this.getCount(),F;if(H>0){F=H-1;do{this._buttons[F].set("disabled",G);}while(F--);}},_onKeyDown:function(K){var G=B.getTarget(K),I=B.getCharCode(K),H=G.parentNode.parentNode.id,J=E[H],F=-1;if(I==37||I==38){F=(J.index===0)?(this._buttons.length-1):(J.index-1);}else{if(I==39||I==40){F=(J.index===(this._buttons.length-1))?0:(J.index+1);}}if(F>-1){this.check(F);this.getButton(F).focus();}},_onAppendTo:function(H){var I=this._buttons,G=I.length,F;for(F=0;F<G;F++){I[F].appendTo(this.get("element"));}},_onButtonCheckedChange:function(G,F){var I=G.newValue,H=this.get("checkedButton");if(I&&H!=F){if(H){H.set("checked",false,true);}this.set("checkedButton",F);this.set("value",F.get("value"));}else{if(H&&!H.set("checked")){H.set("checked",true,true);}}},init:function(I,H){this._buttons=[];YAHOO.widget.ButtonGroup.superclass.init.call(this,I,H);this.addClass(this.CSS_CLASS_NAME);var J=this.getElementsByClassName("yui-radio-button");if(J.length>0){this.addButtons(J);}function F(K){return(K.type=="radio");}J=C.getElementsBy(F,"input",this.get("element"));if(J.length>0){this.addButtons(J);}this.on("keydown",this._onKeyDown);this.on("appendTo",this._onAppendTo);var G=this.get("container");if(G){if(D.isString(G)){B.onContentReady(G,function(){this.appendTo(G);},null,this);}else{this.appendTo(G);}}},initAttributes:function(G){var F=G||{};YAHOO.widget.ButtonGroup.superclass.initAttributes.call(this,F);this.setAttributeConfig("name",{value:F.name,validator:D.isString});this.setAttributeConfig("disabled",{value:(F.disabled||false),validator:D.isBoolean,method:this._setDisabled});this.setAttributeConfig("value",{value:F.value});this.setAttributeConfig("container",{value:F.container,writeOnce:true});this.setAttributeConfig("checkedButton",{value:null});},addButton:function(J){var L,K,G,F,H,I;if(J instanceof A&&J.get("type")=="radio"){L=J;}else{if(!D.isString(J)&&!J.nodeName){J.type="radio";L=new A(J);}else{L=new A(J,{type:"radio"});}}if(L){F=this._buttons.length;H=L.get("name");I=this.get("name");L.index=F;this._buttons[F]=L;E[L.get("id")]=L;if(H!=I){L.set("name",I);}if(this.get("disabled")){L.set("disabled",true);}if(L.get("checked")){this.set("checkedButton",L);}K=L.get("element");G=this.get("element");if(K.parentNode!=G){G.appendChild(K);}L.on("checkedChange",this._onButtonCheckedChange,L,this);}return L;},addButtons:function(G){var H,I,J,F;if(D.isArray(G)){H=G.length;J=[];if(H>0){for(F=0;F<H;F++){I=this.addButton(G[F]);if(I){J[J.length]=I;}}}}return J;},removeButton:function(H){var I=this.getButton(H),G,F;if(I){this._buttons.splice(H,1);delete E[I.get("id")];I.removeListener("checkedChange",this._onButtonCheckedChange);I.destroy();G=this._buttons.length;if(G>0){F=this._buttons.length-1;do{this._buttons[F].index=F;}while(F--);}}},getButton:function(F){return this._buttons[F];},getButtons:function(){return this._buttons;},getCount:function(){return this._buttons.length;},focus:function(H){var I,G,F;if(D.isNumber(H)){I=this._buttons[H];if(I){I.focus();}}else{G=this.getCount();for(F=0;F<G;F++){I=this._buttons[F];if(!I.get("disabled")){I.focus();break;}}}},check:function(F){var G=this.getButton(F);if(G){G.set("checked",true);}},destroy:function(){var I=this._buttons.length,H=this.get("element"),F=H.parentNode,G;if(I>0){G=this._buttons.length-1;do{this._buttons[G].destroy();}while(G--);}B.purgeElement(H);F.removeChild(H);},toString:function(){return("ButtonGroup "+this.get("id"));}});})();YAHOO.register("button",YAHOO.widget.Button,{version:"@VERSION@",build:"@BUILD@"});