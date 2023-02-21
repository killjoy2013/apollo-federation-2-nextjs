// You don't need to define all of these hooks! Just define
// whichever ones your customization needs.


  fn supergraph_service(service) {
    let request_callback = |request| {
        
        print("Supergraph service: Client request received");
    };
    
    let response_callback = |response| {
        print("Supergraph service: Client response ready to send");
    };
  
    service.map_request(request_callback);
    service.map_response(response_callback);
  }
  
  fn execution_service(service) {
    let request_callback = |request| {
        print("Execution service: GraphQL execution initiated");
    };
    
    let response_callback = |response| {
        print("Supergraph service: Client response assembled");
    };
  
    service.map_request(request_callback);
    service.map_response(response_callback);
  }


  
  
  // Passed an additional `subgraph` parameter that indicates the subgraph's name
  fn subgraph_service(service, subgraph) {
    let request_callback = |request| {
        
            // Note: APOLLO_AUTHENTICATION_JWT_CLAIMS is a Rhai-scope constant with
            // value `apollo_authentication::JWT::claims`
            let claims = request.context[APOLLO_AUTHENTICATION_JWT_CLAIMS];

            print(`claims: ${claims}`);


            if claims ==() {
              throw #{
                status: 401
              };
            }
            // Add each claim key-value pair as a separate HTTP header

            let user = #{
            };
            

            for key in claims.keys() {

                user[key] = claims[key];

              //let myclaim= claims[key];


            //   print(`HEADERS ${type_of(request.subgraph.headers)}`);
            }

            print(`USER ${user}`);

            print(`values of rights: ${user.rights} `);
            print(`type of rights: ${user.rights.type_of()} `);
            
            request.subgraph.headers["rights"] = user.rights;
            
            print(`type of header.rights: ${request.subgraph.headers.values("rights").type_of()} `);
            print(`values of header.rights: ${request.subgraph.headers.values("rights")} `);

          
        print(`Subgraph service: Ready to send sub-operation to subgraph ${subgraph}`);
    };
    
    let response_callback = |response| {
        print(`Subgraph service: Received sub-operation response from subgraph ${subgraph}`);
    };

   

    
  
    service.map_request(request_callback);
    service.map_response(response_callback);
  }