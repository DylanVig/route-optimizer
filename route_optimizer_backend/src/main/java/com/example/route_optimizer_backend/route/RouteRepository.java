package com.example.route_optimizer_backend.route;

import com.example.route_optimizer_backend.user.User;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RouteRepository
        extends JpaRepository<Route, Long> {

    @Query("SELECT r FROM Route r WHERE r.userId = ?1")
    Optional<Route[]> findRouteListByUserId(Long userId);
}
