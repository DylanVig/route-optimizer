package com.example.route_optimizer_backend.route;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "route")
public class Route {
    @Id
    @SequenceGenerator(
            name = "route_sequence",
            sequenceName = "route_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "route_sequence"
    )

    private Long id;
    private Long userId;
    private String routeName;
    private String routeDescription;

    @ElementCollection
    @CollectionTable(name = "route_order", joinColumns = @JoinColumn(name = "route_id"))
    @Column(name = "address")
    private List<String> routeOrder;

    public Route() {}

    public Route(Long userId, String routeName, String routeDescription, String[] routeOrder) {
        this.userId = userId;
        this.routeName = routeName;
        this.routeDescription = routeDescription;
        this.routeOrder = List.of(routeOrder);
    }

    public Route(Long id, Long userId, String routeName, String routeDescription, String[] routeOrder) {
        this.id = id;
        this.userId = userId;
        this.routeName = routeName;
        this.routeDescription = routeDescription;
        this.routeOrder = List.of(routeOrder);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public String getRouteDescription() {
        return routeDescription;
    }

    public void setRouteDescription(String routeDescription) {
        this.routeDescription = routeDescription;
    }

    public List<String> getRouteOrder() {
        return routeOrder;
    }

    public void setRouteOrder(List<String> routeOrder) {
        this.routeOrder = routeOrder;
    }
}
