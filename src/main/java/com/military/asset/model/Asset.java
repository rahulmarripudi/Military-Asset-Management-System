package com.military.asset.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "assets")
@EntityListeners(AuditingEntityListener.class)
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String serialNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetType type;

    private String subtype;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetStatus status;

    @Enumerated(EnumType.STRING)
    private AssetCondition condition;

    @Column(nullable = false)
    private LocalDateTime acquisitionDate;

    @Column(nullable = false)
    private BigDecimal acquisitionCost;

    private String manufacturer;
    private String model;
    private String description;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    private LocalDateTime lastServiced;
    private LocalDateTime nextServiceDue;

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
    private Set<MaintenanceRecord> maintenanceHistory = new HashSet<>();

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL)
    private Set<DeploymentRecord> deploymentHistory = new HashSet<>();

    private String notes;

    @ElementCollection
    private Set<String> images = new HashSet<>();

    @ElementCollection
    private Set<String> tags = new HashSet<>();

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}