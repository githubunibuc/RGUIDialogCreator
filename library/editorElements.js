/* eslint-disable no-console */

var editorElements = {

    // defaults
    fontFamily: '',
    fontSize: '',

    // set default font size and family
    setDefaultFont: function(size, family)
    {
        this.fontSize = size;
        this.fontFamily = family;
    },
    // The elements
    // ==============================================
    // Add button

    addButton: function(paper, data)
    {
        if( this.isObject(data) ) 
        {    
            // data to int
            let dataLeft = isNaN(parseInt(data.left)) ? 15 : parseInt(data.left);
            let dataTop = isNaN(parseInt(data.top)) ? 15 : parseInt(data.top);

            // temporari element to get the button's width
            let labelT = paper.text(dataLeft, dataTop, data.label).attr({"text-anchor": "middle", "font-size": editorElements.fontSize, "font-family": editorElements.fontFamily});
            let lBBox = labelT.getBBox();
            labelT.remove();

            let rect = paper.rect(dataLeft, dataTop, Math.round(lBBox.width)+20, Math.round(lBBox.height) + 10).attr({fill: "#FFFFFF", "stroke": "#5d5d5d"});

            let label = paper.text(dataLeft+10, dataTop + ((Math.round(lBBox.height) / 2) + 5), data.label).attr({"text-anchor": "start", "font-size": editorElements.fontSize, "font-family": editorElements.fontFamily});

            if(data.isEnabled == 'false') {
                rect.attr({fill: "#cccccc", stroke: "#848484"});
                label.attr({fill: "#848484"});
            }

            let set = paper.set();
            set.push( label, rect );
            
            return set;
        } else {
            return;
        }
    },

    // Add checkbox
    addCheckbox: function(paper, data)
    {
        if( this.isObject(data) ) {

            // check for user input
            if(data.left < 10 || data.left > paper.width - 10){ data.left = 10; }
            if(data.top < 10 || data.top > paper.height - 10){ data.top = 10; }
            

            // data.top + 1 fix
            let dataTop = (data.isChecked === 'true') ? parseInt(data.top)+2 : parseInt(data.top)+1;
            let dataLeft = parseInt(data.left);

            // return Raphael object
            var cb = [];
            cb.active = true;
            
            // an array because the label might be arranged on multiple lines
            cb.label = new Array(1);
            
            var txtanchor = "start";
            var xpos = parseInt(data.left);
            var ypos = dataTop;
            var dim = 12;            

            // label is to the right
            xpos += 20;
            ypos += dim / 2;
            let label = paper.text(xpos, ypos, data.label).attr({"text-anchor": txtanchor, "font-size": editorElements.fontSize, "font-family": editorElements.fontFamily});
            let square = paper.rect(dataLeft, dataTop, dim, dim).attr({fill: (data.isChecked === 'true') ? "#97bd6c" : "#eeeeee", "stroke-width": 1, stroke: "#5d5d5d"});
            let checked;

            if(data.isChecked === 'true'){
                checked = paper.path([
                    ["M", dataLeft + 0.2*dim, dataTop + 0.3*dim],
                    ["l", 0.15*dim*2, 0.2*dim*2],
                    ["l", 0.3*dim*2, -0.45*dim*2]
                ]).attr({"stroke-width": 2});
            }

            if(data.isEnabled == 'false') {
                label.attr({fill: "#848484"});
                square.attr({fill: "#cccccc", stroke: "#848484"});
                if(data.isChecked === 'true'){
                    checked.attr({stroke: "#848484"});
                }
            }

            let set = paper.set();
            
            if(data.isChecked === 'true'){
                set.push( label, square, checked);
            }else{
                set.push( label, square );
            }
            return set;
        } else {
            return;
        }
    },

    // Add container
    addContainer: function(paper, data)
    {
        if( this.isObject(data) ) 
        {    
            // data to int
            let dataLeft = parseInt(data.left);
            let dataTop = parseInt(data.top);

            // check for user input
            if(data.width < 50) { data.width = 50; }
            else if(data.width > paper.width - 15) { data.width = paper.width - 30; dataLeft = 15;}

            if(data.height < 50) { data.height = 50; }
            else if(data.height > paper.height - 15) { data.height = paper.height - 30; dataTop = 15; }

            let rect = paper.rect(dataLeft, dataTop, data.width, data.height).attr({fill: "#ffffff", "stroke": "#5d5d5d", "stroke-width": 1});

            if(data.isEnabled == 'false'){
                rect.attr({fill: "#cccccc", stroke: "#848484"});
            }
            return rect;
        } else {
            return;
        }
    },

    // Add counter
    addCounter: function(paper, data)
    {
        if( this.isObject(data) ) 
        {    
            // data to int
            let dataLeft = parseInt(data.left) + 24;
            let dataTop = parseInt(data.top) + 7;

            var txtanchor = "middle";
            let crtVal = data.startval;
                    
            let textvalue = paper.text(dataLeft, dataTop, "" + data.startval)
                .attr({"text-anchor": txtanchor, "font-size": editorElements.fontSize, "font-family": editorElements.fontFamily});
            
            let downsign = paper.path([
                ["M", dataLeft - 12 - parseInt(data.width) / 2, dataTop - 6],
                ["l", 12, 0],
                ["l", -6, 12],
                ["z"]
            ]).attr({fill: "#eeeeee", "stroke-width": 1, stroke: "#5d5d5d"});
            
            let upsign = paper.path([
                ["M", dataLeft + parseInt(data.width) / 2, dataTop + 6],
                ["l", 12, 0],
                ["l", -6, -12],
                ["z"]
            ]).attr({fill: "#eeeeee", "stroke-width": 1, stroke: "#5d5d5d"});
            
            // let down = paper.rect(dataLeft - 22, dataTop - 6, 15, 15)
            //     .attr({fill: "#fff", opacity: 0, stroke: "#000", "stroke-width": 1, cursor: "pointer"});
            
            // let up = paper.rect(dataLeft + 8, dataTop - 8, 15, 15)
            //     .attr({fill: "#fff", opacity: 0, stroke: "#000", "stroke-width": 1, cursor: "pointer"});

            if(data.isEnabled == 'false') {
                textvalue.attr({fill: '#848484'});
                upsign.attr({fill: "#cccccc", stroke: "#848484"});
                downsign.attr({fill: "#cccccc", stroke: "#848484"});
            }
            
            let set = paper.set();
            
            set.push( textvalue, downsign, upsign);
            
            return set;
        } else {
            return;
        }
    },

    // Add Input
    addInput: function(paper, data)
    {
        if( this.isObject(data) ) 
        {    
            // data to int
            let dataLeft = parseInt(data.left);
            let dataTop = parseInt(data.top);

            // check for user input
            if(data.width < 50) { data.width = 50; }
            else if(data.width > paper.width - 15) { data.width = paper.width - 30; dataLeft = 15;}

            if(data.height < 50) { data.height = 50; }
            else if(data.height > paper.height - 15) { data.height = paper.height - 30; dataTop = 15; }

            let rect = paper.rect(dataLeft, dataTop, data.width, 25).attr({fill: "#ffffff", "stroke": "#5d5d5d", "stroke-width": 1});

            if(data.isEnabled == 'false') {
                rect.attr({fill: "#cccccc", stroke: "#848484"});
            }

            if(data.value.trim() != '') {
                let label = paper.text(dataLeft+7, dataTop + 12, data.value).attr({"text-anchor": "start", "font-size": editorElements.fontSize, "font-family": editorElements.fontFamily, fill: (data.isEnabled == 'false') ? "#848484" : " #000000"});
                let set = paper.set();
                set.push( label, rect );
                return set;
            } else {
                return rect;
            }


        } else {
            return;
        }
    },

    // Label element
    addLabel: function(paper, data) 
    {             
        if( this.isObject(data) ) {

            // check for user input
            if(data.left < 10 || data.left > paper.width - 10){ data.left = 10; }
            if(data.top < 10 || data.top > paper.height - 10){ data.top = 10; }
            if(data.fontSize < 10 || data.fontSize > 20){ data.fontSize = 14; }

            // data.top + 7 fix
            let dataTop = parseInt(data.top) + 7;
            let dataLeft = parseInt(data.left);

            // return Raphael object
            return paper.text(dataLeft, dataTop, data.text).attr({fill: '#000', 'text-anchor': 'start', "font-size": data.fontSize, "font-family": editorElements.fontFamily});
        } else {
            return;
        }
    },

    // Add plot
    // addPlot: function(paper, data)
    // {
    //     if( this.isObject(data) ) 
    //     {    
    //         // data to int
    //         let dataLeft = parseInt(data.left);
    //         let dataTop = parseInt(data.top);

    //         // check for user input
    //         if(data.width < 50) { data.width = 50; }
    //         else if(data.width > paper.width - 15) { data.width = paper.width - 30; dataLeft = 15;}

    //         if(data.height < 50) { data.height = 50; }
    //         else if(data.height > paper.height - 15) { data.height = paper.height - 30; dataTop = 15; }

    //         let rect = paper.rect(dataLeft, dataTop, data.width, data.height).attr({fill: "#ffffff", "stroke": "#d6d6d6", "stroke-width": 1});

    //         if(data.isEnabled == 'false'){
    //             rect.attr({fill: "#eeeeee"});
    //         }
    //         return rect;
    //     } else {
    //         return;
    //     }
    // },
    
    // Add radio button
    addRadio: function(paper, data)
    {
        if( this.isObject(data) ) 
        {    
            let dataLeft = parseInt(data.left)+7;
            let dataTop = parseInt(data.top)+7;

            let label = paper.text(dataLeft + 15, dataTop, data.label).attr({"text-anchor": "start", "font-size": editorElements.fontSize, "font-family": editorElements.fontFamily});
            
            // the regular gray circles
            let circle = paper.circle(dataLeft, dataTop, 7).attr({fill: "#eeeeee", "stroke": "#5d5d5d", "stroke-width": 1});

            let set = paper.set();
            
            if(data.isEnabled === 'false')
            {
                circle.attr({fill: "#cccccc", "stroke": "#848484"});
                label.attr({fill: '#848484'});
            }
            
            if(data.isSelected === 'true')
            {
                let circle1 = paper.circle(dataLeft, dataTop, 6).attr({fill: "#97bd6c", stroke: "none"});
                let circle2 = paper.circle(dataLeft, dataTop, 3).attr({fill: (data.isEnabled === 'false') ? "#848484" : "#000000", stroke: "none"});

                set.push( label, circle, circle1, circle2);
            } else {
                set.push( label, circle );
            }
            
            return set;
        } else {
            return;
        }
    },

    // Add select
    addSelect: function(paper, data)
    {
        // data to int
        let dataLeft = parseInt(data.left);
        let dataTop = parseInt(data.top);
        // not widther than 350
        data.width = (data.width > 350) ? 350 : data.width;
        let dataWidth = parseInt(data.width);
        

        let rect = paper.rect(dataLeft, dataTop, dataWidth, 25).attr({fill: "#FFFFFF", "stroke": "#5d5d5d", "stroke-width": 1});
        
        let downsign = paper.path([
            ["M", dataLeft + dataWidth- 15 , dataTop + 8 ],
            ["l", 8, 0],
            ["l", -4, 8],
            ["z"]
        ]).attr({fill: "#5d5d5d", "stroke-width": 0});

        // if select is disable
        if(data.isEnabled == 'false'){
            rect.attr({fill: "#cccccc", stroke: "#848484"});
            downsign.attr({fill: "#848484"});
        }

        let set = paper.set();
        set.push(rect, downsign);

        return set;
    },

    // Add separator
    addSeparator: function(paper, data)
    {
        if( this.isObject(data) ) {

            // check for user input
            if(data.left < 15 || data.left > paper.width - 15){ data.left = 15; }
            if(data.top < 15 || data.top > paper.height - 15){ data.top = 15; }
            
            // return Raphael object
            if(data.direction == 'x') 
            {    
                // width to big
                if(data.length < 50) { data.length = 50; }
                else if(data.length > paper.width - 30) { data.length = paper.width - 30; data.left = 15;}

                let v = parseInt(data.length) + parseInt(data.left);
                
                return paper.path("M" + data.left + " " + data.top + "L"+ v +" " + data.top).attr({stroke: "#5d5d5d"});
            } 
            else if(data.direction == 'y') 
            {    
                // width to big
                if(data.length < 50) { data.length = 50; }
                else if(data.length > paper.height - 30) { data.length = paper.height - 30; data.top = 15;}
                
                let v = parseInt(data.length) + parseInt(data.top);
                
                return paper.path("M" + data.left + " " + data.top + "L" + data.left + " " + v).attr({stroke: "#5d5d5d"});
            }
        } else {
            return;
        }
    },

    // Add slider
    addSlider: function(paper, data)
    {
        if( this.isObject(data) ) {

            // data to int
            let dataLeft = parseInt(data.left);
            let dataTop = parseInt(data.top);
            let dataWidth = parseInt(data.length);
            let dataVal = parseFloat(data.value);

            // check for user input
            if(dataLeft < 10 || dataLeft > paper.width - 10){ dataLeft = 10; }
            if(dataTop < 10 || dataTop > paper.height - 10){ dataTop = 10; }
            if(dataVal < 0) {
                dataVal = 0;
            } else if (dataVal > 1) {
                dataVal = 1;
            }
  
            // width to big
            if(dataWidth < 50) { dataWidth = 50; }
            else if(dataWidth > paper.width - 30) { dataWidth = paper.width - 30; dataLeft = 15;}

            let v = parseInt(dataWidth) + parseInt(dataLeft);
            
            let line = paper.path("M" + dataLeft + " " + dataTop + "L"+ v +" " + dataTop).attr({stroke: "#5d5d5d", "stroke-width": 1});
            
            let tLeft = dataLeft + (dataWidth * dataVal);
            let triangle = paper.path([
                ["M", tLeft - 6, dataTop + 13],
                ["l", 12, 0],
                ["l", -6, -12],
                ["z"]
            ]).attr({fill: "#eeeeee", "stroke-width": 1, stroke: "#5d5d5d"});
    

            if(data.isEnabled === 'false')
            {
                line.attr({stroke: '#848484'});
                triangle.attr({fill: "#cccccc", "stroke": "#cccccc"});
            }

            let set = paper.set();
            set.push( line, triangle );

            return set;
            
        } else {
            return;
        }
    },

    // Helpers
    // ==============================================
    // Make element + cover draggable
    draggable: function(paperEvents, container)
    {
        var me = this,    
            lx = 0,
            ly = 0,
            ox = 0,
            oy = 0,
            pw = this.paper.width,
            ph = this.paper.height,
            moveFnc = function(dx, dy) 
            {
                lx = dx + ox;
                ly = dy + oy;

                // do not drag outside - right side
                if (lx + this.attr().width + this.attr().x + 10 > pw) {
                    lx = pw - this.attr().width - this.attr().x - 10;                      
                }
                // do not drag outside - left side 
                if ((lx + this.attr().x) - 10 < 10) {                
                    lx = - this.attr().x + 10; 
                }
                
                // do not drag outside - bottom side
                if(ly + this.attr().y + this.attr().height + 10 > ph){
                    ly = ph - (this.attr().height + this.attr().y) - 10;
                }

                // do not drag outside - top side
                if((ly + this.attr().y) - 10 < 10){
                    ly = - this.attr().y + 10;                         
                }

                me.transform('T' + lx + ',' + ly);
            },
            startFnc = function() {
                // this is needed for when the paper is resized - elements should update draggable area
                pw = this.paper.width;
                ph = this.paper.height;
            },
            endFnc = function() {
                ox = lx;
                oy = ly;
                // update element position and reload
                let newBBox = me.getBBox();
                container.elements[this.data("elId")].left = Math.round(newBBox.x)+5;
                container.elements[this.data("elId")].top = Math.round(newBBox.y)+5;
                paperEvents.emit('getEl', container.getElement(this.data("elId")));
            };

        this.drag(moveFnc, startFnc, endFnc);
    },

    // check if somethin is an object
    isObject: function(obj)
    {
        if(typeof obj === 'object'){
            return true;
        }
        return false;
    }
};

module.exports = editorElements;
