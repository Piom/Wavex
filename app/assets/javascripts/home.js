(function($){
    $(function(){
        var map = new YMaps.Map(YMaps.jQuery("#YMap")[0]);
        map.addControl(new YMaps.TypeControl());
        map.addControl(new YMaps.ToolBar());
        map.addControl(new YMaps.Zoom());
        map.addControl(new YMaps.MiniMap());
        map.addControl(new YMaps.ScaleLine());
        map.enableHotKeys();
        map.enableScrollZoom();
        var data = $.data(document, "YMap", map);
        $.get('/markers.json',function(data){
            var lastItem;
            $(data).each(function(i, item){
                lastItem=item;
                var placeMark = new YMaps.Placemark(new YMaps.GeoPoint(item.longitude, item.latitude));
                placeMark.name = item.name;
                map.addOverlay(placeMark);
            });
            map.setCenter(new YMaps.GeoPoint(lastItem.longitude, lastItem.latitude), 10);
        }, "JSON");

        $('.map-marker').on('click',function(){

            var $data = $.data(document),
                $this=$(this);

            $.getJSON('/markers/show.json',{
                marker_id : $this.attr("href").match(/\d/g)
            },function(data){
                item = $(data).get(0);
                map.setCenter(new YMaps.GeoPoint(item.longitude, item.latitude), 10);
            });
            return false;
        });
        $('a[data-toggle="add_marker"]').on('click',function(){
            $('div.add-marker').modal('show');
        });

        YMaps.Events.observe(
            map,
            map.Events.Click,
            function (map, mEvent) {
                $('#add-marker input[name="longitude"]').val(mEvent.getGeoPoint().getX());
                $('#add-marker input[name="latitude"]').val(mEvent.getGeoPoint().getY());
                $('div.add-marker').modal('show');
            }
        );

        $('[data-action="close"]').on('click',function(){
            $('div.add-marker').modal('close');
        });
        $('[data-action="save-marker"]').on('click',function(){
           $.post(
               '/markers',
               $('#add-marker').serialize(),
               function(){
                    console.log('save');
               },
               'JSON'
           );
        });

    });
})(jQuery);