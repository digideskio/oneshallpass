function log2(e){return Math.log(e)/Math.log(2)}function sha_to_shorts(e){var t=CryptoJS.SHA512(e),n=[],r;for(r=0;r<t.words.length;r++)word=t.words[r],n.push(word&65535),n.push((word>>16)+32767);return n}function $(e){return document.getElementById(e)}function acceptFocus(e){var t=e.srcElement;state.gotFocus||(t.value="",state.gotFocus=!0)}function _gen1(){if(state.randshorts.length===0){var e=state.seed.concat(state.lasthash),t=sha_to_shorts(e.toString());state.lasthash=t.slice(0),state.randshorts=t}var n=state.randshorts.pop();return n}function gen1(e){var t=Math.ceil(log2(e)),n=-1,r=~(2147483647<<t);while(n<0||n>=e)n=_gen1()&r;return n}function generate_pw(){var e=Math.ceil(state.security_param/log2(dict.words.length)),t=[],n;for(n=0;n<e;n++)t.push(dict.words[gen1(dict.words.length)]);return t.join(" ")}function show_results(){$("pw-status").style.display="none",$("pw-0").style.display="inline-block",state.showing_res=!0}function generate(){$("pw-0").firstChild.nodeValue=generate_pw(),show_results()}function hide_results(){$("pw-status").style.display="inline-block",$("pw-0").style.display="none",state.showing_res=!1}function maybe_generate_2(){var e=!1,t=(new Date).getTime();state.first_gen?t-state.first_gen>3e3&&(e=!0):(state.first_gen=t,e=!0),e&&generate()}function maybe_generate(){var e=state.seed.length/2;if(e>0){var t;e>state.security_param?(t="...computing...",maybe_generate_2()):(state.showing_res&&hide_results(),t="Collected "+e+" of "+state.security_param+"; need MORE"),$("pw-status").firstChild.nodeValue=t}}function gotInput(e){var t=e.srcElement,n=e.keyCode,r=!1,s=5;for(i=0;i<s&&!r;i++)state.last_n[i]==n&&(r=!0);if(!r){var o=state.last_n;o.length==s&&(o=o.slice(1)),o.push(n),state.last_n=o,state.seed.push((new Date).getTime()%100),state.seed.push(e.keyCode),maybe_generate()}}function entropyChanged(e){state.security_param=e.srcElement.value,maybe_generate()}var state={seed:[],last_n:[],getFocus:!1,randshorts:[],prev:[],security_param:58,showing_res:!1,first_gen:null};