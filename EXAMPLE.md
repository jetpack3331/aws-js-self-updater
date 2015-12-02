Example AWS lambda function can be
===================================

```JavaScript
    exports.handler = function(event, context) {
        // It can be loaded from S3 bucket, API endpoint, whenever
        var availableVersion = 3;
        
        // You can call S3 putObject, loadObject, Wrecker build etc.
        // Then call context.succees probably with page reload function
       
        context.succeed({
            stableVersion: 1, 
            availableVersion: availableVersion, 
            html: {footer: '<p>We have new version '+availableVersion+'</p>'}, 
            customJs: [
                'alert("Execute internal function over external app")',
                'callReduxAction("fetchData", {path: "/posts"})'
                ]
            
        });
    };
```