//  Copyright 2015 mParticle, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

(function (window) {
    var name = 'Twitter',
        moduleId = 43,
        MessageType = {
            PageView    : 3    
        };
    
    var constructor = function () {
        var self = this,
            isInitialized = false,
            forwarderSettings = null,
            reportingService = null,
            isTesting = false,
            eventQueue = [];
            
        self.name = name;
        
        function initForwarder(settings, service, testMode) {
            forwarderSettings = settings;
            reportingService  = service;
            isTesting         = testMode;
            d = document;
            
            try {
                if (!testMode) {
                    (function() {
                        var w, d, s, e;
                        
                        w = window;
                        
                        if(!w.twttr) {
                            d       = document;
                            s       = document.createElement('script');
                            s.type  = 'text/javascript';
                            s.src   = '//platform.twitter.com/oct.js';
                            s.onload = function () {
                                if(twttr && eventQueue.length > 0) {
                                    for (var i = 0; i < eventQueue.length; i++) {
                                        processEvent(eventQueue[i]);
                                    }

                                    eventQueue = [];
                                }    
                            };
                            
                            e       = d.getElementsByTagName('script')[0];
                            
                            e.parentNode.insertBefore(s, e);
                        }    
                    })();    
                }
                
                isInitialized = true;
                
                return 'Successfully initialized: ' + name;
                        
            } catch (e) {
                return 'Can\'t initialize forwarder: '+ name +':' + e;
            }
        }
        
        function processEvent(event) {
            var reportEvent = false;
            
            if(!isInitialized) {
                return 'Can\'t send forwarder '+ name + ', not initialized';
            }
            
            if(!window.twttr) { 
                eventQueue.push(event);
                return;
            }
            
            try {
                if(event.EventDataType == MessageType.PageView) {
                    reportEvent = true;
                    logEvent(event);
                } 
                
                if(reportEvent && reportingService) {
                    reportingService(self, event);
                }
                
                return 'Successfully sent to forwarder ' + name;
            } catch (error) {
                return 'Can\'t send to forwarder: ' + name + ' ' + e;
            }
        }
        
        function logEvent(event) {
            twttr.conversion.trackPid(forwarderSettings.pixelId);
        }
        
        this.init       = initForwarder;
        this.process    = processEvent;       
    };
    
    function getId() {
        return moduleId;
    }

    function register(config) {
        if (config.kits) {
            config.kits[name] = {
                constructor: constructor
            };
        }
    }

    if (!window ||
        !window.mParticle ||
        !window.mParticle.addForwarder) {

        return;
    }

    window.mParticle.addForwarder({
        name       : name,
        constructor: constructor,
        getId: getId
    });
    
    module.exports = {
        register: register
    };
})(window);
