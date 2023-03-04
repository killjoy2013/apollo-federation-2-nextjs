// You don't need to define all of these hooks! Just define
// whichever ones your customization needs.


  fn supergraph_service(service) {
    let request_callback = |request| {
        print("EXTERNAL Supergraph service: Client request received");
    };
    
    let response_callback = |response| {
        print("EXTERNAL Supergraph service: Client response ready to send");
    };
  
    service.map_request(request_callback);
    service.map_response(response_callback);
  }
  
  fn execution_service(service) {
    let request_callback = |request| {
        print("EXTERNAL Execution service: GraphQL execution initiated");
    };
    
    let response_callback = |response| {
        print("EXTERNAL Supergraph service: Client response assembled");
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
            }

            print(`USER ${user}`);

            print(`values of username: ${user.username} `);

            print(`values of rights: ${user.rights} `);
            print(`type of rights: ${user.rights.type_of()} `);
            
            request.subgraph.headers["rights"] = user.rights;
            request.subgraph.headers["username"] = user.username;
            
            print(`type of header.rights: ${request.subgraph.headers.values("rights").type_of()} `);
            print(`values of header.rights: ${request.subgraph.headers.values("rights")} `);

          
        print(`EXTERNAL Subgraph service: Ready to send sub-operation to subgraph ${subgraph}`);
    };
    
    let response_callback = |response| {
        print(`EXTERNAL Subgraph service: Received sub-operation response from subgraph ${subgraph}`);
    };
  
    service.map_request(request_callback);
    service.map_response(response_callback);
  }

  fn process_request(request) {

    print("PROCESS REQUESTTTTT");

    // Find our cookies
    if "cookie" in request.headers {
        print("adding cookies as headers");
        let cookies = request.headers["cookie"].split(';');
        print(`cookies ${cookies}`);
        for cookie in cookies {
            // Split our cookies into name and value
            let k_v = cookie.split('=', 2);
            if k_v.len() == 2 {
                // trim off any whitespace
                k_v[0].trim();
                k_v[1].trim();
                // update our headers
                // Note: we must update subgraph.headers, since we are
                // setting a header in our sub graph request
                request.subgraph.headers[k_v[0]] = k_v[1];
            }
        }
    } else {
        print("no cookies in request");
    }
}