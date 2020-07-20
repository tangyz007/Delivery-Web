package laiproject.delivery;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.DistanceMatrixApiRequest;
import com.google.maps.GeoApiContext;
import com.google.maps.errors.ApiException;
import com.google.maps.model.DistanceMatrix;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
public class DeliveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(DeliveryApplication.class, args);
    }

    @GetMapping("/hello")
    public String sayHello(@RequestParam(value = "myName", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    @GetMapping("/recommend")
    public DistanceMatrix recommend() {
//        final GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyCxiKSD-acPm1syrHWVQtCln60p1QTuoQM");
        GeoApiContext context = new GeoApiContext.Builder()
                .apiKey("AIzaSyCxiKSD-acPm1syrHWVQtCln60p1QTuoQM")
                .build();
        String userAddress = "1031 Irving St, San Francisco, CA 94122";
        String receiverAddress = "450 10th St, San Francisco, CA 94103";

        try{
            DistanceMatrixApiRequest req = DistanceMatrixApi.newRequest(context);
            DistanceMatrix trix = req.origins(userAddress).destinations(receiverAddress).await();

            return trix;
        }catch (ApiException e){
            System.out.println(e.getMessage());
        }catch (Exception e){
            System.out.println(e.getMessage());
        }

        return null;
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    @ResponseBody
    public String getFoosBySimplePath() {
        return "Get some Foos";
    }



}
