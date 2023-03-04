  fn supergraph_service(service) {
    let request_callback = |request| {
        print("Internal Supergraph service: Client request received");
    };
    
    let response_callback = |response| {
        print("Internal Supergraph service: Client response ready to send");
    };
  
    service.map_request(request_callback);
    service.map_response(response_callback);
  }
  
  fn execution_service(service) {
    let request_callback = |request| {
        print("Internal Execution service: GraphQL execution initiated");
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
        print(`Internal Subgraph service: Ready to send sub-operation to subgraph ${subgraph}`);
    };
    
    let response_callback = |response| {
        print(`Internal Subgraph service: Received sub-operation response from subgraph ${subgraph}`);
    };
  
    service.map_request(request_callback);
    service.map_response(response_callback);
  }